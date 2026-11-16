# 🏗️ Kiến Trúc Hệ Thống & Cơ Sở Dữ Liệu (System & Data Architecture)

## 1. Kiến Trúc Tổng Thể (Hybrid Architecture)

Hệ thống kết hợp 2 lớp cơ sở dữ liệu chuyên biệt:
```
                                ┌─────────────────────────────────────────┐
                                │          Next.js App Router             │
                                │   (React 19 / Turbopack / TypeScript)   │
                                └────────────────────┬────────────────────┘
                                                     │
                             ┌───────────────────────┴───────────────────────┐
                             │                                               │
                             ▼                                               ▼
               ┌───────────────────────────┐                   ┌───────────────────────────┐
               │    PostgreSQL + Prisma    │                   │      Neo4j Graph DB       │
               ├───────────────────────────┤                   ├───────────────────────────┤
               │ • Auth & User Accounts    │                   │ • Person Nodes            │
               │ • Tree Metadata           │                   │ • PARENT_OF Relationships │
               │ • RBAC (Tree Memberships) │                   │ • MARRIED_TO Rels         │
               │ • Edit Proposals (Queue)  │                   │ • Deep Lineage Traversal  │
               │ • Audit Logs              │                   │ • Kinship / Path Finding  │
               └───────────────────────────┘                   └───────────────────────────┘
```

---

## 2. PostgreSQL Schema (Prisma ORM)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// -------------------------------------------------------------
// 1. AUTHENTICATION & USER MANAGEMENT (NextAuth.js v5 compatible)
// -------------------------------------------------------------
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  passwordHash  String?
  phone         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  memberships   TreeMembership[]
  proposals     EditProposal[]
  auditLogs     AuditLog[]
}

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String? @db.Text
  access_token       String? @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String? @db.Text
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// -------------------------------------------------------------
// 2. MULTI-TENANT FAMILY TREES & MEMBERSHIPS
// -------------------------------------------------------------
model Tree {
  id          String    @id @default(cuid())
  name        String    // Tên dòng họ (Ví dụ: "Gia phả Họ Đinh - Chi Lăng")
  slug        String    @unique
  description String?   @db.Text
  originPlace String?   // Quê quán / Gốc tổ
  isPublic    Boolean   @default(false)
  passcode    String?   // Mã bảo vệ cho khách xem
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  branches    TreeBranch[]
  memberships TreeMembership[]
  proposals   EditProposal[]
  auditLogs   AuditLog[]
}

enum TreeRole {
  ADMIN      // Quản trị viên / Tộc trưởng (Toàn quyền quản lý cây, phân quyền, duyệt sửa đổi)
  EDITOR     // Người chép sử (Nhập liệu, sửa phả đồ)
  MEMBER     // Con cháu đã liên kết Node (Claim Profile, tự sửa info cá nhân, gửi đề xuất)
  VIEWER     // Khách xem nội bộ
}

model TreeMembership {
  id          String    @id @default(cuid())
  treeId      String
  userId      String
  role        TreeRole  @default(MEMBER)
  personId    String?   // Liên kết với Node Person trên Neo4j (Claimed Profile)
  joinedAt    DateTime  @default(now())

  tree Tree @relation(fields: [treeId], references: [id], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([treeId, userId])
  @@index([treeId, personId])
}

model TreeBranch {
  id          String    @id @default(cuid())
  treeId      String
  name        String    // Tên chi/nhánh (Ví dụ: "Chi 1 Hà Nội", "Chi 2 Hải Dương")
  rootPersonId String?  // ID cụ tổ đầu cành trên Neo4j
  order       Int       @default(0)

  tree Tree @relation(fields: [treeId], references: [id], onDelete: Cascade)

  @@index([treeId])
}

// -------------------------------------------------------------
// 3. EDIT PROPOSALS & AUDIT LOGS
// -------------------------------------------------------------
enum ProposalStatus {
  PENDING
  APPROVED
  REJECTED
}

model EditProposal {
  id          String          @id @default(cuid())
  treeId      String
  userId      String
  targetId    String?         // Person ID hoặc Relationship ID
  changeType  String          // "UPDATE_INFO" | "ADD_CHILD" | "ADD_SPOUSE"
  payloadJson Json            // Dữ liệu chi tiết đề xuất thay đổi
  status      ProposalStatus  @default(PENDING)
  reviewerNote String?
  reviewedAt  DateTime?
  createdAt   DateTime        @default(now())

  tree Tree @relation(fields: [treeId], references: [id], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([treeId, status])
}

model AuditLog {
  id        String   @id @default(cuid())
  treeId    String
  userId    String?
  action    String   // "CREATE_MEMBER" | "UPDATE_MEMBER" | "DELETE_MEMBER" | "MERGE_BRANCH"
  details   Json?
  createdAt DateTime @default(now())

  tree Tree  @relation(fields: [treeId], references: [id], onDelete: Cascade)
  user User? @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([treeId, createdAt])
}
```

---

## 3. Neo4j Graph Data Model

Mọi Node và Quan hệ trong Neo4j **bắt buộc phải gắn `treeId`** để đảm bảo cô lập dữ liệu hoàn toàn giữa các dòng họ:

### 3.1. Node Label: `:Person`
```cypher
(:Person {
  treeId: "cuid_tree_xxx",          // Tenant Isolation Key
  id: "uuid_person_xxx",            // Unique Person ID
  full_name: "Đinh Văn A",
  gender: "male",                   // "male" | "female" | "other"
  generation: 19,                   // Thế hệ (Đời)
  branchId: "branch_xxx",           // Thuộc chi nhánh nào (optional)
  title: "Trưởng chi",              // Tước vị / Chức vụ dòng họ
  alias_name: "Tự Phúc An",         // Tên tự, tên hiệu
  birthDate: "1985-05-20",
  deathDate: null,
  is_alive: true,
  birthPlace: "Thái Bình",
  current_residence: "Hà Nội",
  job: "Kỹ sư",
  biography: "Tiểu sử chi tiết...",
  avatar: "/uploads/avatars/p1.jpg",
  avatar_history: ["/uploads/..."],
  resting_place: "Nghĩa trang quê nhà", // Nơi an nghỉ (nếu đã mất)
  burial_coordinates: "20.123, 106.456", // Tọa độ phần mộ
  in_law: false                     // Là dâu/rể hay con cháu chính thống
})
```

### 3.2. Relationship Types
1. **`[:PARENT_OF]`**:
   ```cypher
   (parent:Person {treeId: $treeId})-[r:PARENT_OF {
     treeId: $treeId,
     relation_type: "BIOLOGICAL" // "BIOLOGICAL" | "ADOPTED" (Con nuôi) | "STEP"
   }]->(child:Person {treeId: $treeId})
   ```
2. **`[:MARRIED_TO]` / `[:SPOUSE_OF]`**:
   ```cypher
   (husband:Person {treeId: $treeId})-[r:MARRIED_TO {
     treeId: $treeId,
     marriage_order: 1,            // Vợ cả (1), Vợ thứ (2, 3)
     status: "MARRIED"             // "MARRIED" | "DIVORCED" | "WIDOWED"
   }]->(wife:Person {treeId: $treeId})
   ```

### 3.3. Ràng Buộc & Chỉ Mục Neo4j (Constraints & Indexes)
```cypher
// Đảm bảo tính duy nhất của Node trong từng Cây
CREATE CONSTRAINT unique_tree_person_id IF NOT EXISTS
FOR (p:Person) REQUIRE (p.treeId, p.id) IS UNIQUE;

// Tăng tốc độ lọc theo cây và thế hệ
CREATE INDEX person_tree_generation_idx IF NOT EXISTS
FOR (p:Person) ON (p.treeId, p.generation);

// Tăng tốc tìm kiếm theo họ tên trong cây
CREATE INDEX person_tree_name_idx IF NOT EXISTS
FOR (p:Person) ON (p.treeId, p.full_name);
```
