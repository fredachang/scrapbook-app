export interface DbUser {
  id: string;
  email: string;
  salt: string;
  password: string;
  first_name: string;
  last_name: string;
  created: Date;
  updated: Date;
}

export interface DbUserTemp {
  id: string;
  email: string;
  salt: string;
  password: string;
  firstName: string;
  lastName: string;
  created: Date;
  updated: Date;
}

export interface DbChannel {
  id: string;
  title: string;
  created: Date;
  updated: Date;
  is_private: boolean;
  user_id: string;
}

export interface DbBlock {
  id: string;
  image_path: string;
  created: Date;
  image_data: any;
}

export interface DbConnection {
  id: string;
  block_id: string;
  channel_id: string;
  user_id: string;
  created: Date;
}

export interface DbConnectionWithImage {
  id: string;
  block_id: string;
  channel_id: string;
  user_id: string;
  created: Date;
  image_path: string | null;
  image_data: string | ArrayBuffer | null;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  created: Date;
}
