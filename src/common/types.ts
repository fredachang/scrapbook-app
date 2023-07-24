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
}

export interface DbConnection {
  id: string;
  block_id: string;
  channel_id: string;
  user_id: string;
  created: Date;
}

export interface Connection {
  id: string;
  block_id: string;
  channel_id: string;
  user_id: string;
  created: Date;
  image_path: string;
}
