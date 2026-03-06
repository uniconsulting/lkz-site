export type DocumentType =
  | "technical_description"
  | "declaration_of_conformity"
  | "fire_certificate"
  | "sgr"
  | "other_internal";

export type ProductDocument = {
  id: string;
  type: DocumentType;
  name: string;
  url: string;
  isPublic: boolean;
};
