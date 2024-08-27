export interface MessageType {
  role: 'user' | 'assistant' | 'system';
  content?: string;
}

export interface TagType {
  tag_name: string;
  tag_id: string;
  checked?: boolean;
}

export interface MultiTagType {
  tag_name: string;
  tag_id: string;
  checked?: boolean;
  sub_tags?: TagType[];
}
