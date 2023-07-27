export interface Channel {
  id: string;
  title: string;
  created: Date;
  updated: Date;
  isPrivate: boolean;
  userId: string;
}

export interface Block {
  id: string;
  imagePath: string;
  created: Date;
  imageData: any;
}

export interface Connection {
  id: string;
  blockId: string;
  channelId: string;
  userId: string;
  created: Date;
}

export interface ConnectionWithImage {
  id: string;
  blockId: string;
  channelId: string;
  userId: string;
  created: Date;
  imagePath: string | null;
  imageData: string | null;
}
