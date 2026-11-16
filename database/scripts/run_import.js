const fs = require('fs');
const path = require('path');
const neo4j = require('neo4j-driver');

// Read .env.local and .env if exists
function loadEnv() {
  const envFiles = ['.env', '.env.local'];
  for (const file of envFiles) {
    const envPath = path.join(__dirname, '../../', file);
    if (fs.existsSync(envPath)) {
      const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...vals] = trimmed.split('=');
          if (key && vals.length > 0) {
            process.env[key.trim()] = vals.join('=').trim().replace(/^["']|["']$/g, '');
          }
        }
      }
    }
  }
}

loadEnv();

const uri = process.env.NEO4J_URI || 'bolt://localhost:7687';
const user = process.env.NEO4J_USERNAME || 'neo4j';
const password = process.env.NEO4J_PASSWORD || 'password';

console.log(`🔌 Kết nối tới Neo4j tại: ${uri} (user: ${user})...`);

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

// Helper to split Cypher statements while ignoring semicolons and comments inside strings
function splitStatements(content) {
  const statements = [];
  let current = '';
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : '';
    const nextChar = i < content.length - 1 ? content[i + 1] : '';

    // Handle comments outside of quotes
    if (!inSingleQuote && !inDoubleQuote) {
      if (!inLineComment && !inBlockComment && char === '/' && nextChar === '/') {
        inLineComment = true;
        i++; // skip next /
        continue;
      }
      if (inLineComment && (char === '\n' || char === '\r')) {
        inLineComment = false;
        current += char;
        continue;
      }
      if (!inLineComment && !inBlockComment && char === '/' && nextChar === '*') {
        inBlockComment = true;
        i++; // skip next *
        continue;
      }
      if (inBlockComment && char === '*' && nextChar === '/') {
        inBlockComment = false;
        i++; // skip next /
        continue;
      }
    }

    if (inLineComment || inBlockComment) {
      continue;
    }

    // Handle quotes (with escape character check)
    if (char === "'" && prevChar !== '\\' && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
    } else if (char === '"' && prevChar !== '\\' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
    }

    // Handle semicolon outside of strings
    if (char === ';' && !inSingleQuote && !inDoubleQuote) {
      if (current.trim().length > 0) {
        statements.push(current.trim());
      }
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim().length > 0) {
    statements.push(current.trim());
  }

  return statements;
}

const files = [
  '01_ancestors_d01_d19.cypher',
  '02_branch1_hanoi.cypher',
  '03_branch2_haiduong.cypher',
  '04_branch3_chilang.cypher',
  '05_branch4_taybac.cypher'
];

async function run() {
  const session = driver.session();
  try {
    for (const file of files) {
      const filePath = path.join(__dirname, file);
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Không tìm thấy file: ${file}`);
        continue;
      }

      console.log(`\n📂 Đang thực thi file: ${file}...`);
      const rawContent = fs.readFileSync(filePath, 'utf-8');
      const statements = splitStatements(rawContent);

      console.log(`   👉 Tìm thấy ${statements.length} câu lệnh Cypher.`);

      for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i];
        try {
          await session.run(stmt);
        } catch (err) {
          console.error(`\n❌ Lỗi tại file ${file}, câu lệnh số ${i + 1}:`);
          console.error(`Statement snippet:\n${stmt.substring(0, 200)}...`);
          console.error(`Chi tiết lỗi:`, err.message);
          throw err;
        }
      }

      console.log(`   ✅ Hoàn thành: ${file}`);
    }

    // Check stats
    console.log('\n📊 THỐNG KÊ DỮ LIỆU SAU KHI CHẠY:');
    const personCountRes = await session.run('MATCH (p:Person) RETURN count(p) AS total');
    const totalPersons = personCountRes.records[0].get('total').toNumber();

    const relCountRes = await session.run('MATCH ()-[r]->() RETURN count(r) AS total');
    const totalRels = relCountRes.records[0].get('total').toNumber();

    const genRes = await session.run('MATCH (p:Person) RETURN p.generation AS gen, count(p) AS count ORDER BY gen');
    
    console.log(`   - Tổng số thành viên (Person): ${totalPersons}`);
    console.log(`   - Tổng số quan hệ (Relationships): ${totalRels}`);
    console.log('   - Phân bố theo đời (Generation):');
    genRes.records.forEach(r => {
      const gen = r.get('gen');
      const count = r.get('count').toNumber();
      console.log(`     + Đời ${gen !== null ? gen : 'Chưa rõ'}: ${count} người`);
    });

    // Tự động liên kết treeId với Tree của tài khoản dinhgiang@gmail.com
    try {
      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();
      const user = await prisma.user.findUnique({
        where: { email: 'dinhgiang@gmail.com' },
        include: {
          memberships: {
            include: { tree: { include: { branches: true } } }
          }
        }
      });

      if (user && user.memberships.length > 0) {
        const tree = user.memberships[0].tree;
        console.log(`\n🔗 Đang liên kết ${totalPersons} thành viên vào Cây Gia Phả: "${tree.name}" (ID: ${tree.id})...`);
        await session.run(`MATCH (p:Person) SET p.treeId = $treeId`, { treeId: tree.id });
        console.log(`   ✅ Đã gán treeId = "${tree.id}" cho toàn bộ thành viên.`);

        // Gán branchId nếu có
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
          console.log(`   🌿 Đã đồng bộ branchId vào các Node đồ thị.`);
        }
      }
      await prisma.$disconnect();
    } catch (err) {
      console.warn('⚠️ Lưu ý: Không thể tự động liên kết Prisma Tree (bỏ qua):', err.message);
    }

    console.log('\n🎉 ĐÃ NẠP TOÀN BỘ DỮ LIỆU VÀO NEO4J THÀNH CÔNG!');

  } finally {
    await session.close();
    await driver.close();
  }
}

run().catch(err => {
  console.error('\n💥 Quá trình chạy script gặp lỗi dừng lại:', err);
  process.exit(1);
});
