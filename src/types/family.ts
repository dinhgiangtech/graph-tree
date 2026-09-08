export interface FamilyMember {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  title?: string;
  alias_name?: string;
  birthDate?: string;
  deathDate?: string;
  birthPlace?: string;
  current_residence?: string;
  job?: string;
  bio?: string;
  avatar?: string;
  generation?: number;
  is_alive?: boolean;
}

export type RelationshipType = 'PARENT_OF' | 'SPOUSE_OF' | 'FATHER_OF' | 'MOTHER_OF' | 'MARRIED_TO';

export interface Relationship {
  id: string;
  from: string; // Member ID
  to: string;   // Member ID
  type: RelationshipType;
}

export interface FamilyTreeData {
  members: FamilyMember[];
  relationships: Relationship[];
}

export interface GraphNodeData extends FamilyMember {
  onAddSpouse?: (member: FamilyMember) => void;
  onAddChild?: (member: FamilyMember) => void;
  onEdit?: (member: FamilyMember) => void;
  onDelete?: (id: string) => void;
  isSelected?: boolean;
}
