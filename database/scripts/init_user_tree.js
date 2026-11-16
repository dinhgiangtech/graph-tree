const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const neo4j = require('neo4j-driver');

// 1. Tải biến môi trường từ .env.local và .env
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const envPath = path.join(__dirname, '../../', file);
    if (fs.existsSync(envPath)) {
      const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...vals] = trimmed.split('=');
          if (key && vals.length > 0) {
            const cleanKey = key.trim();
            if (!process.env[cleanKey]) {
              process.env[cleanKey] = vals.join('=').trim().replace(/^["']|["']$/g, '');
            }
          }
        }
      }
    }
  }
}

loadEnv();

const prisma = new PrismaClient();

const TARGET_EMAIL = 'dinhgiang@gmail.com';
const TARGET_NAME = 'Đinh Giang';
const DEFAULT_PASSWORD = 'password123'; // Mật khẩu mặc định nếu tài khoản chưa từng tạo

async function main() {
  console.log('🚀 Bắt đầu khởi tạo dữ liệu cho tài khoản:', TARGET_EMAIL);

  try {
    // 2. Tìm hoặc Tạo tài khoản User trong PostgreSQL
    let user = await prisma.user.findUnique({
      where: { email: TARGET_EMAIL },
    });

    if (!user) {
      console.log(`👤 Chưa tìm thấy User ${TARGET_EMAIL}, đang tạo tài khoản mới...`);
      const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
      user = await prisma.user.create({
        data: {
          email: TARGET_EMAIL,
          name: TARGET_NAME,
          passwordHash,
        },
      });
      console.log(`✅ Đã tạo tài khoản User thành công (ID: ${user.id}). Mật khẩu: "${DEFAULT_PASSWORD}"`);
    } else {
      console.log(`✅ Tìm thấy tài khoản User đã có sẵn (ID: ${user.id}, Name: ${user.name || TARGET_NAME})`);
      if (!user.name) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { name: TARGET_NAME },
        });
      }
    }

    // 3. Tìm hoặc Tạo Cây Gia Phả trong PostgreSQL
    let existingMembership = await prisma.treeMembership.findFirst({
      where: {
        userId: user.id,
        tree: {
          name: { contains: 'Họ Đinh' },
        },
      },
      include: { tree: { include: { branches: true } } },
    });

    let tree;
    if (existingMembership) {
      tree = existingMembership.tree;
      console.log(`🌳 Tìm thấy Cây Gia Phả đã liên kết: "${tree.name}" (Tree ID: ${tree.id})`);
    } else {
      console.log('🌳 Đang tạo Cây Gia Phả mới cho tài khoản...');
      const baseSlug = 'gia-pha-ho-dinh';
      const existingTreeWithSlug = await prisma.tree.findUnique({ where: { slug: baseSlug } });
      const slug = existingTreeWithSlug ? `${baseSlug}-${Math.random().toString(36).substring(2, 6)}` : baseSlug;

      tree = await prisma.tree.create({
        data: {
          name: 'Gia Phả Họ Đinh - Chi Lăng',
          slug,
          description: 'Cây gia phả Họ Đinh (gốc Lam Sơn, Thanh Hóa - Đô Kỳ, Chi Lăng, Hưng Hà, Thái Bình) cùng các chi nhánh.',
          originPlace: 'Đô Kỳ - Y Đốn, Chi Lăng, Hưng Hà, Thái Bình',
          isPublic: true,
          memberships: {
            create: {
              userId: user.id,
              role: 'ADMIN',
            },
          },
          branches: {
            create: [
              { name: 'Chi 1 - Hà Nội & TP.HCM', order: 1 },
              { name: 'Chi 2 - Hải Dương', order: 2 },
              { name: 'Chi 3 - Chi Lăng (Thái Bình)', order: 3 },
              { name: 'Chi 4 - Tây Bắc', order: 4 },
            ],
          },
          auditLogs: {
            create: {
              userId: user.id,
              action: 'INIT_MOCK_TREE',
              details: { description: 'Khởi tạo cây mẫu Họ Đinh cho tài khoản dinhgiang@gmail.com' },
            },
          },
        },
        include: { branches: true },
      });
      console.log(`✅ Đã tạo Cây Gia Phả: "${tree.name}" (Tree ID: ${tree.id}) với quyền ADMIN.`);
    }

    // Đảm bảo user có quyền ADMIN
    await prisma.treeMembership.upsert({
      where: {
        treeId_userId: {
          treeId: tree.id,
          userId: user.id,
        },
      },
      update: { role: 'ADMIN' },
      create: {
        treeId: tree.id,
        userId: user.id,
        role: 'ADMIN',
      },
    });

    // 4. Kết nối Neo4j và gán treeId cho toàn bộ các node Person
    const neo4jUri = process.env.NEO4J_URI || 'bolt://localhost:7687';
    const neo4jUser = process.env.NEO4J_USERNAME || 'neo4j';
    const neo4jPassword = process.env.NEO4J_PASSWORD || 'password';

    console.log(`🔌 Kết nối tới Neo4j (${neo4jUri})...`);
    const driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUser, neo4jPassword));
    const session = driver.session();

    try {
      const updateResult = await session.run(
        `
        MATCH (p:Person)
        SET p.treeId = $treeId
        RETURN count(p) as totalUpdated
        `,
        { treeId: tree.id }
      );

      const totalUpdated = updateResult.records[0]?.get('totalUpdated')?.toNumber?.() ?? updateResult.records[0]?.get('totalUpdated') ?? 0;
      console.log(`🎉 ĐÃ GÁN THÀNH CÔNG: ${totalUpdated} thành viên (Person) trong Neo4j vào Tree ID: "${tree.id}"`);

      // Gán branchId tương ứng cho các nhánh nếu có
      if (tree.branches && tree.branches.length > 0) {
        const b1 = tree.branches.find(b => b.name.includes('Chi 1'));
        const b2 = tree.branches.find(b => b.name.includes('Chi 2'));
        const b3 = tree.branches.find(b => b.name.includes('Chi 3'));
        const b4 = tree.branches.find(b => b.name.includes('Chi 4'));

        if (b1) {
          await session.run(
            `MATCH (p:Person) WHERE p.id CONTAINS 'KHI' OR p.id CONTAINS 'DUNG' OR p.id CONTAINS 'LUU' OR p.id CONTAINS 'D21' OR p.id CONTAINS 'D22' OR p.id CONTAINS 'D23' OR p.id CONTAINS 'D24' OR p.id CONTAINS 'D25' SET p.branchId = $branchId`,
            { branchId: b1.id }
          );
        }
        if (b2) {
          await session.run(
            `MATCH (p:Person) WHERE p.id CONTAINS 'BACH' OR p.id CONTAINS 'NHAM' OR p.id CONTAINS 'NGA' OR p.id CONTAINS 'MUON' SET p.branchId = $branchId`,
            { branchId: b2.id }
          );
        }
        if (b3) {
          await session.run(
            `MATCH (p:Person) WHERE p.id CONTAINS 'CHI_LANG' OR p.id CONTAINS 'CL' SET p.branchId = $branchId`,
            { branchId: b3.id }
          );
        }
        if (b4) {
          await session.run(
            `MATCH (p:Person) WHERE p.id CONTAINS 'TAY_BAC' OR p.id CONTAINS 'TB' SET p.branchId = $branchId`,
            { branchId: b4.id }
          );
        }
        console.log(`🌿 Đã đồng bộ ID các Chi nhánh (TreeBranch) vào các Node đồ thị.`);
      }
    } finally {
      await session.close();
      await driver.close();
    }

    console.log('\n=============================================');
    console.log('✨ HOÀN TẤT KHỞI TẠO DỮ LIỆU THÀNH CÔNG! ✨');
    console.log('👉 Tài khoản đăng nhập:', TARGET_EMAIL);
    console.log('👉 Mật khẩu (nếu tài khoản mới tạo):', DEFAULT_PASSWORD);
    console.log('👉 Cây gia phả:', tree.name);
    console.log('👉 Tree ID:', tree.id);
    console.log('👉 Đường dẫn trực tiếp:', `http://localhost:3000/trees/${tree.id}`);
    console.log('👉 Bảng điều khiển:', 'http://localhost:3000/dashboard');
    console.log('=============================================\n');

  } catch (error) {
    console.error('❌ Lỗi khi khởi tạo:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
