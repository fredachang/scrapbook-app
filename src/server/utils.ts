import crypto from "crypto";
import jwt, { Secret } from "jsonwebtoken";
import {
  DbBlock,
  DbChannel,
  DbConnection,
  DbConnectionWithImage,
  DbFeed,
  DbUser,
  User,
} from "./types";
import {
  Block,
  BlockForFeed,
  Channel,
  Connection,
  ConnectionWithImage,
  Feed,
  FeedFolded,
  FeedWithDateString,
} from "../common/types";
import { format, parseISO } from "date-fns";

interface Password {
  salt: string;
  hashedPassword: string;
}

export const createJwt = (
  payload: Parameters<typeof jwt.sign>[0],
  token: Secret
) => {
  return jwt.sign(payload, token, { expiresIn: "10h" });
};

export const createSalt = () => crypto.randomBytes(20).toString("hex");

const hashPassword = (password: string, salt: string): string => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
};

export const hashAndSaltUserPassword = (password: string): Password => {
  const salt = createSalt();
  const hashedPassword = hashPassword(password, salt);

  return {
    salt,
    hashedPassword,
  };
};

export const verifyPassword = (
  plainTextPassword: string,
  salt: string,
  hashedPassword: string
): boolean => {
  return hashPassword(plainTextPassword, salt) === hashedPassword;
};

export const mapUser = (user: DbUser): User => ({
  id: user.id,
  email: user.email,
  firstName: user.first_name,
  lastName: user.last_name,
  created: user.created,
});

export const mapBlocks = (blocks: DbBlock[]): Block[] => {
  return blocks.map((block) => ({
    id: block.id,
    imagePath: block.image_path,
    created: block.created,
    imageData: block.image_data,
  }));
};

export const mapChannels = (channels: DbChannel[]): Channel[] => {
  return channels.map((channel) => ({
    id: channel.id,
    title: channel.title,
    created: channel.created,
    updated: channel.updated,
    isPrivate: channel.is_private,
    userId: channel.user_id,
  }));
};

export const mapConnections = (connections: DbConnection[]): Connection[] => {
  return connections.map((connection) => ({
    id: connection.id,
    blockId: connection.block_id,
    channelId: connection.channel_id,
    userId: connection.user_id,
    created: connection.created,
  }));
};

export const mapConnectionsWithImage = (
  connections: DbConnectionWithImage[]
): ConnectionWithImage[] => {
  return connections.map((connection) => ({
    id: connection.id,
    blockId: connection.block_id,
    channelId: connection.channel_id,
    userId: connection.user_id,
    created: connection.created,
    imagePath: connection.image_path,
    imageData: connection.image_data,
  }));
};

export const convertTime = (created: Date) => {
  const dateString = created.toISOString();
  const dateObj = parseISO(dateString);
  const formattedDate = format(dateObj, "yyyy-MM-dd");
  return formattedDate;
};

export const mapFeeds = (feeds: DbFeed[]): Feed[] => {
  return feeds.map((feed) => ({
    id: feed.id,
    blockId: feed.block_id,
    channelId: feed.channel_id,
    userId: feed.user_id,
    created: feed.created,
    firstName: feed.first_name,
    lastName: feed.last_name,
    channelTitle: feed.channel_title,
    imagePath: feed.image_path,
    imageData: feed.image_data,
  }));
};

export const restructureFeeds = (feeds: FeedWithDateString[]): FeedFolded[] => {
  return feeds.reduce<FeedFolded[]>((accumulator, currentValue) => {
    const key = `${currentValue.created}_${currentValue.channelId}_${currentValue.userId}`;

    const existingItem = accumulator.find((item) => item.key === key);
    const block: BlockForFeed = {
      id: currentValue.blockId,
      imagePath: currentValue.imagePath,
      imageData: currentValue.imageData,
    };

    if (existingItem) {
      existingItem.blocks.push(block);
    } else {
      accumulator.push({
        key,
        blocks: [block],
        channelId: currentValue.channelId,
        userId: currentValue.userId,
        created: currentValue.created,
        firstName: currentValue.firstName || "",
        lastName: currentValue.lastName || "",
        channelTitle: currentValue.channelTitle,
      });
    }

    return accumulator;
  }, []);
};
