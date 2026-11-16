export interface FamilyMember {
  id: string;
  treeId?: string;
  branchId?: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  title?: string;
  alias_name?: string;
  birthDate?: string;
  deathDate?: string;
  lunar_birth_date?: string;
  lunar_death_date?: string;
  birthPlace?: string;
  current_residence?: string;
  resting_place?: string;
  burial_coordinates?: string;
  job?: string;
  bio?: string;
  avatar?: string;
  generation?: number;
  is_alive?: boolean;
  in_law?: boolean;
  marriage_order?: number;
}

export type RelationshipType = 'PARENT_OF' | 'SPOUSE_OF' | 'FATHER_OF' | 'MOTHER_OF' | 'MARRIED_TO';

export interface Relationship {
  id: string;
  from: string; // Member ID
  to: string;   // Member ID
  type: RelationshipType;
  marriageOrder?: number;
}

export interface FamilyTreeData {
  members: FamilyMember[];
  relationships: Relationship[];
}

export interface TreeGraphFilter {
  branchId?: string;      // Lọc theo chi nhánh cụ thể
  minGeneration?: number; // Thế hệ bắt đầu (ví dụ: Đời 1)
  maxGeneration?: number; // Thế hệ kết thúc (ví dụ: Đời 5)
  rootPersonId?: string;  // Xem cây con từ 1 cụ tổ (Sub-tree Focus)
}

export interface GraphNodeData extends FamilyMember, Record<string, unknown> {
  onAddSpouse?: (member: FamilyMember) => void;
  onAddChild?: (member: FamilyMember) => void;
  onEdit?: (member: FamilyMember) => void;
  onDelete?: (id: string) => void;
  isSelected?: boolean;
}
