export interface Source {
  name: string;
  email: string;
}

export interface Destination {
  name: string;
  address: string;
}

export type Action = 'Allow' | 'Block';

export interface Rule {
  _id: string;
  ruleIndex: number;
  name: string;
  action: Action;
  sources: Source[];
  destinations: Destination[];
  isNew?: boolean;
  isDeleted?: boolean;
  isEdited?: boolean;
}