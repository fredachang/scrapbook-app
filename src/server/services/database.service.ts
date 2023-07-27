import { Pool, QueryResult } from "pg";
import {
  Block,
  Channel,
  Connection,
  ConnectionWithImage,
} from "../../common/types";
import { DbChannel, DbConnection, DbUser } from "../types";

export class DatabaseService {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async writeUser(user: Partial<DbUser>): Promise<DbUser> {
    const { rows } = await this.pool.query(
      "INSERT INTO users(email, salt, password, first_name, last_name, created, updated) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING email, salt, password, first_name as firstName, last_name as lastName, created, updated",
      [
        user.email,
        user.salt,
        user.password,
        user.firstName,
        user.lastName,
        user.created,
        user.created,
      ]
    );

    if (rows.length === 0) {
      throw new Error("Error inserting user into database");
    }

    return rows[0];
  }

  async createChannel(channel: Partial<Channel>): Promise<Channel> {
    const { rows } = await this.pool.query<DbChannel>(
      "INSERT INTO channels(title,is_private,created, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [channel.title, channel.isPrivate, channel.created, channel.userId]
    );

    if (rows.length === 0) {
      throw new Error("Error inserting channel into database");
    }

    const dbChannel = rows[0];

    return {
      ...dbChannel,
      isPrivate: dbChannel.is_private,
      userId: dbChannel.user_id,
    };
  }

  async createBlock(block: Partial<Block>): Promise<Block> {
    const { rows } = await this.pool.query(
      "INSERT INTO blocks(image_path,created) VALUES ($1, $2) RETURNING *",
      [block.imagePath, block.created]
    );

    if (rows.length === 0) {
      throw new Error("Error uploading block");
    }

    const dbBlock = rows[0];

    return {
      ...dbBlock,
      imagePath: dbBlock.image_path,
      imageData: dbBlock.image_data,
    };
  }

  // async createBlockByUpload(block: Partial<Block>): Promise<DbBlock> {
  //   const { rows } = await this.pool.query(
  //     "INSERT INTO blocks(created, image_data) VALUES ($1, $2) RETURNING *",
  //     [block.created, block.imageData]
  //   );

  //   if (rows.length === 0) {
  //     throw new Error("Error uploading image into block");
  //   }

  //   return rows[0];
  // }

  async createConnection(connection: Partial<Connection>): Promise<Connection> {
    const { rows } = await this.pool.query(
      "INSERT INTO connections(block_id,channel_id, user_id) VALUES ($1, $2, $3) RETURNING *",
      [connection.blockId, connection.channelId, connection.userId]
    );

    if (rows.length === 0) {
      throw new Error("Error establishing a connection");
    }

    const dbConnection = rows[0];

    return {
      ...dbConnection,
      blockId: dbConnection.block_id,
      channelId: dbConnection.channel.id,
      userId: dbConnection.user_id,
    };
  }

  async getConnectionId(blockId: string, channelId: string): Promise<string> {
    const query = `
        SELECT id
        FROM connections
        WHERE block_id = $1
          AND channel_id = $2;
      `;

    const { rows } = await this.pool.query<{ id: string }>(query, [
      blockId,
      channelId,
    ]);

    if (rows.length === 0) {
      throw new Error("Connection not found.");
    }

    const foundConnection = rows[0];

    return foundConnection.id;
  }

  async getConnectionsByUserId(userId: string): Promise<ConnectionWithImage[]> {
    const { rows: connections } = await this.pool.query<DbConnection>(
      "SELECT * FROM connections WHERE user_id = $1",
      [userId]
    );

    if (connections.length === 0) {
      throw new Error("Error retrieving connection");
    }

    const mappedConnections = connections.map((connection) => ({
      ...connection,
      blockId: connection.block_id,
      channelId: connection.channel_id,
      userId: connection.user_id,
      imagePath: connection.image_path,
      imageData: connection.image_data,
    }));

    return mappedConnections;
  }

  async getChannelsByUserId(userId: string): Promise<Channel[]> {
    const { rows: channels } = await this.pool.query(
      "SELECT * FROM channels WHERE user_id = $1",
      [userId]
    );

    if (channels.length === 0) {
      throw new Error("Error retrieving connection");
    }

    return channels.map((channel) => ({
      ...channel,
      isPrivate: channel.is_private,
      userId: channel.user_id,
    }));
  }

  async getChannelIdsByBlockIdAndUserId(
    blockId: string,
    userId: string
  ): Promise<string[]> {
    const { rows } = await this.pool.query(
      "SELECT channel_id FROM connections WHERE block_id = $1 AND user_id = $2",
      [blockId, userId]
    );

    if (rows.length === 0) {
      return [];
    }

    const channelIds = rows.map((row) => row.channel_id);

    return channelIds;
  }

  async getChannelsByChannelId(channelIds: string[]): Promise<Channel[]> {
    const { rows } = await this.pool.query(
      "SELECT * FROM channels WHERE id = ANY($1)",
      [channelIds]
    );

    if (rows.length === 0) {
      throw new Error("Error retrieving channels for block");
    }

    const channels = rows;

    const mappedChannels = channels.map((channel) => ({
      ...channel,
      isPrivate: channel.is_private,
      userId: channel.user_id,
    }));

    return mappedChannels;
  }

  async getConnectionsWithImagePath(
    userId: string
  ): Promise<ConnectionWithImage[]> {
    const query = `
      SELECT 
        c.*,
        b.image_path, 
        b.image_data
      FROM 
        connections c
      JOIN 
        blocks b ON c.block_id = b.id
      WHERE 
        c.user_id = $1;
    `;

    const { rows: connections } = await this.pool.query<DbConnection>(query, [
      userId,
    ]);

    if (connections.length === 0) {
      throw new Error("Error retrieving connection with image path");
    }

    const mappedConnections = connections.map((connection) => {
      const imageData = connection.image_data;

      const base64Image = imageData
        ? Buffer.from(imageData).toString("base64")
        : null;

      return {
        ...connection,
        imageData: base64Image,
        blockId: connection.block_id,
        channelId: connection.channel_id,
        userId: connection.user_id,
        imagePath: connection.image_path,
      };
    });

    return mappedConnections;
  }

  async getBlocksByBlockIds(blockIds: string[]): Promise<Block[]> {
    const { rows: blocks } = await this.pool.query(
      "SELECT * FROM blocks WHERE id = ANY($1)",
      [blockIds]
    );

    if (blocks.length === 0) {
      throw new Error("Error retrieving block");
    }

    const mappedBlocks = blocks.map((block) => ({
      ...block,
      imagePath: block.image_path,
      ImageData: block.image_data,
    }));

    return mappedBlocks;
  }

  //check if the same block is duplicated in a chanel
  async getExistingBlockIdInChanel(
    channelId: string,
    blockId: string
  ): Promise<string | null> {
    const query =
      "SELECT block_id FROM connections WHERE channel_id = $1 AND block_id = $2";

    const { rows } = await this.pool.query(query, [channelId, blockId]);

    if (rows.length === 0) {
      return null;
    }

    const existingBlockId = rows[0];

    return existingBlockId;
  }

  //this essentially checks if blocks are connected to any other channel, and return an array of blockids that are
  async getDuplicateBlocksAcrossChanels(): Promise<string[] | []> {
    const { rows: duplicateBlocks } = await this.pool.query(
      "SELECT ARRAY_AGG(block_id) AS unique_block_ids, COUNT(*) AS duplication_count FROM connections GROUP BY block_id HAVING COUNT(*) > 1 "
    );

    if (duplicateBlocks.length === 0) {
      return [];
    }

    //this returns the blocks that are also connected to other channels

    const duplicateBlockIds = duplicateBlocks.map(
      (row) => row.unique_block_ids
    );

    return duplicateBlockIds;
  }

  async getUserById(userId: number): Promise<DbUser | null> {
    const { rows } = await this.pool.query("SELECT * FROM users WHERE id=$1", [
      userId,
    ]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async deleteConnectionsByBlockId(
    blockId: string
  ): Promise<Connection | null> {
    const { rows } = await this.pool.query(
      "DELETE FROM connections WHERE block_id=$1",
      [blockId]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async deleteConnectionByConnectionId(
    connectionId: string
  ): Promise<DbConnection | null> {
    const { rows } = await this.pool.query(
      "DELETE FROM connections WHERE id=$1",
      [connectionId]
    );

    if (rows.length === 0) {
      return null;
    }

    const deletedConnection = rows[0];

    return deletedConnection;
  }

  async deleteConnectionsByChannelId(
    channelId: string
  ): Promise<DbConnection[] | null> {
    const { rows } = await this.pool.query(
      "DELETE FROM connections WHERE channel_id=$1",
      [channelId]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async deleteChannel(channelId: string): Promise<Channel | null> {
    const { rows } = await this.pool.query("DELETE FROM channels WHERE id=$1", [
      channelId,
    ]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async deleteBlock(blockId: string): Promise<Block | null> {
    const { rows } = await this.pool.query("DELETE FROM blocks WHERE id=$1", [
      blockId,
    ]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async deleteMultipleBlocks(blockIds: string[]): Promise<Block[] | null> {
    const { rows } = await this.pool.query(
      "DELETE FROM blocks WHERE id IN ($1:csv) RETURNING *",
      [blockIds]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows;
  }

  async getUserIdForBlock(blockId: string): Promise<string | null> {
    const { rows } = await this.pool.query(
      "SELECT user_id FROM connections WHERE block_id=$1",
      [blockId]
    );

    if (rows.length === 0) {
      return null;
    }

    const blockUserId = rows[0].user_id;

    return blockUserId;
  }

  async getUserByEmail(email: string): Promise<DbUser | null> {
    const { rows } = await this.pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (rows.length === 0) {
      return null;
    }

    const user = rows[0];

    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      salt: user.salt,
      password: user.password,
      created: user.created,
      updated: user.updated,
    };
  }

  async emailExists(email: string): Promise<boolean> {
    const { rows } = await this.pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    return rows.length > 0;
  }
}
