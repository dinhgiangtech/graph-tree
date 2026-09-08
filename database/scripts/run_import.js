const fs = require('fs');
const path = require('path');
const neo4j = require('neo4j-driver');

// Read .env.local if exists
function loadEnv() {
  const envPath = path.join(__dirname, '../../.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...vals] = trimmed.split('=');
        if (key && vals.length > 0) {
          process.env[key.trim()] = vals.join('=').trim();
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

// Helper to split Cypher statements while ignoring semicolons inside strings or comments
function splitStatements(content) {
  // Remove single-line comments // ...
  const lines = content.split('\n');
  const cleanedLines = lines.map(line => {
    const commentIdx = line.indexOf('//');
    if (commentIdx !== -1) {
      // Simple check to make sure // is not inside a string
      const before = line.substring(0, commentIdx);
      const singleQuotes = (before.match(/'/g) || []).length;
      const doubleQuotes = (before.match(/"/g) || []).length;
      if (singleQuotes % 2 === 0 && doubleQuotes % 2 === 0) {
        return before;
      }
    }
    return line;
  });

  const fullCleaned = cleanedLines.join('\n');
  const statements = fullCleaned
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

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
