export interface Channel {
  id: string;
  title: string;
  created: Date;
  updated: Date;
  is_private: boolean;
  user_id: string;
}

export interface Block {
  id: string;
  image_path: string;
  created: Date;
  image_data: any;
}

export interface Connection {
  id: string;
  block_id: string;
  channel_id: string;
  user_id: string;
  created: Date;
  image_path: string | null;
  image_data: string | null;
}
