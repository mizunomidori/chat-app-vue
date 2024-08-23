export interface MessageType {
  role: 'user' | 'assistant' | 'system';
  content?: string;
}

export interface TagType {
  tag_name: string;
  tag_id: string;
  checked: boolean;
}
