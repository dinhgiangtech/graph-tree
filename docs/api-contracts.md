# 📡 Hợp Đồng API & Dịch Vụ Dữ Liệu (API Contracts & Server Actions)

## 1. Chuẩn Thiết Kế Giao Tiếp (Design Standards)
- Sử dụng **Next.js Server Actions** cho các thao tác Mutation & Query nội bộ có kiểm tra phiên xác thực (`auth()`).
- Sử dụng **API Route Handlers** (`/api/...`) cho các chức năng Public API, Tải tệp lên (File Upload), và Xuất dữ liệu (Export stream).
- Chuẩn hóa định dạng phản hồi (Standard Response Format):
  ```typescript
  type ActionResponse<T> = {
    success: boolean;
    data?: T;
    error?: {
      code: string;
      message: string;
    };
  };
  ```

---

## 2. Danh Sách Server Actions Chính

### 2.1. Quản Trị Cây Gia Phả (Tree Management)
```typescript
// 1. Tạo cây gia phả mới
export async function createFamilyTree(data: {
  name: string;
  description?: string;
  originPlace?: string;
  isPublic?: boolean;
}): Promise<ActionResponse<{ treeId: string; slug: string }>>;

// 2. Lấy danh sách cây của người dùng hiện tại
export async function getMyTrees(): Promise<ActionResponse<Array<{
  id: string;
  name: string;
  slug: string;
  role: TreeRole;
  memberCount: number;
  updatedAt: Date;
}>>>;

// 3. Cập nhật thông tin / Cài đặt quyền riêng tư cây
export async function updateTreeSettings(treeId: string, data: {
  name?: string;
  description?: string;
  isPublic?: boolean;
  passcode?: string | null;
}): Promise<ActionResponse<void>>;

// 4. Mời thành viên hoặc cập nhật quyền (Role)
export async function updateTreeMemberRole(
  treeId: string,
  targetUserId: string,
  newRole: TreeRole
): Promise<ActionResponse<void>>;
```

---

### 2.2. Thao Tác Đồ Thị & Phả Hệ (Graph & Member Engine)
```typescript
// Bộ lọc phả đồ nâng cao
export interface TreeGraphFilter {
  branchId?: string;      // Lọc theo chi nhánh cụ thể
  minGeneration?: number; // Thế hệ bắt đầu (ví dụ: Đời 1)
  maxGeneration?: number; // Thế hệ kết thúc (ví dụ: Đời 5)
  rootPersonId?: string;  // Xem cây từ một cụ tổ cụ thể trở xuống
}

// 1. Tải dữ liệu đồ thị cây (Nodes & Edges) có phân quyền và lọc
export async function getFamilyTreeGraph(
  treeId: string,
  filter?: TreeGraphFilter
): Promise<ActionResponse<{
  members: FamilyMember[];
  relationships: Relationship[];
  branches: TreeBranch[];
  viewerRole: TreeRole | 'PUBLIC';
}>>;

// 2. Thêm hoặc cập nhật thành viên phả hệ
export async function upsertFamilyMember(
  treeId: string,
  member: Omit<FamilyMember, 'id'> & { id?: string },
  connection?: {
    relativeId: string;
    type: 'PARENT_OF' | 'SPOUSE_OF' | 'FATHER_OF' | 'MOTHER_OF' | 'MARRIED_TO';
    marriageOrder?: number;
  }
): Promise<ActionResponse<FamilyMember>>;

// 3. Xóa thành viên khỏi phả hệ
export async function deleteFamilyMember(
  treeId: string,
  personId: string
): Promise<ActionResponse<void>>;

// 4. Tra cứu quan hệ huyết thống & danh xưng giữa 2 người (Kinship Finder)
export async function findKinshipPath(
  treeId: string,
  personId1: string,
  personId2: string
): Promise<ActionResponse<{
  path: PersonSummary[];
  relationshipTitle: string; // "Chú ruột", "Bác họ", "Cháu 4 đời", ...
}>>;
```

---

### 2.3. Quy Trình "Claim Profile" & Đề Xuất Chỉnh Sửa (Proposals)
```typescript
// 1. Con cháu gửi yêu cầu liên kết hồ sơ của mình trên cây
export async function claimProfileRequest(
  treeId: string,
  personId: string,
  note?: string
): Promise<ActionResponse<void>>;

// 2. Con cháu gửi đề xuất chỉnh sửa thông tin người thân
export async function submitEditProposal(
  treeId: string,
  data: {
    targetId?: string;
    changeType: 'UPDATE_INFO' | 'ADD_CHILD' | 'ADD_SPOUSE';
    payload: Record<string, any>;
  }
): Promise<ActionResponse<{ proposalId: string }>>;

// 3. Admin/Editor duyệt hoặc từ chối đề xuất
export async function reviewProposal(
  treeId: string,
  proposalId: string,
  decision: 'APPROVED' | 'REJECTED',
  reviewerNote?: string
): Promise<ActionResponse<void>>;
```

---

### 2.4. Nhập / Xuất Dữ Liệu (Import & Export Endpoints)
- `POST /api/trees/[treeId]/import/excel`: Nhận file `.xlsx` / `.csv`, phân tích cú pháp và chèn hàng loạt vào Neo4j với transaction an toàn.
- `GET /api/trees/[treeId]/export/excel`: Xuất toàn bộ danh bạ thành viên ra file Excel định dạng chuẩn.
- `GET /api/trees/[treeId]/export/pdf`: Xuất file PDF Tập Phả Ký truyền thống có trang bìa, mục lục và phả đồ.
