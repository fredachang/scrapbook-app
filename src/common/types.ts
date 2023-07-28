export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  created: Date;
}

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
  imagePath: string | null;
  created: Date;
  imageData: any;
}

export interface BlockForFeed {
  id: string;
  imagePath: string | null;
  imageData: any;
}

export interface Connection {
  id: string;
  blockId: string;
  channelId: string;
  userId: string;
  created: Date;
}

export interface Feed {
  id: string;
  blockId: string;
  channelId: string;
  userId: string;
  created: Date;
  firstName: string;
  lastName: string;
  channelTitle: string;
  imagePath: string | null;
  imageData: any;
}

export interface FeedWithDateString {
  id: string;
  blockId: string;
  channelId: string;
  userId: string;
  created: string;
  firstName: string;
  lastName: string;
  channelTitle: string;
  imagePath: string | null;
  imageData: any;
}

export interface FeedFolded {
  key: string;
  blocks: BlockForFeed[];
  channelId: string;
  userId: string;
  created: string;
  firstName: string;
  lastName: string;
  channelTitle: string;
}

export interface ConnectionWithImage {
  id: string;
  blockId: string;
  channelId: string;
  userId: string;
  created: Date;
  imagePath: string | null;
  imageData: ArrayBuffer | string | null;
}
