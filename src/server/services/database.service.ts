import { Pool } from "pg";
import {
  Block,
  Channel,
  Connection,
  ConnectionWithImage,
} from "../../common/types";
import { DbBlock, DbChannel, DbConnection, DbUser, DbUserTemp } from "../types";
import { mapBlocks, mapChannels, mapConnections } from "../utils";

export class DatabaseService {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  //USERS TABLE

  async writeUser(user: Partial<DbUserTemp>): Promise<DbUser> {
    const { rows } = await this.pool.query<DbUser>(
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
      throw new Error("DATABASE SERVICE:Error inserting user into database");
    }

    return rows[0];
  }

  async getUserById(userId: number): Promise<DbUser | null> {
    const { rows } = await this.pool.query<DbUser>(
      "SELECT * FROM users WHERE id=$1",
      [userId]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async getUserByEmail(email: string): Promise<DbUser | null> {
    const { rows } = await this.pool.query<DbUser>(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (rows.length === 0) {
      return null;
    }

    const user = rows[0];

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
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

  //CONNECTIONS TABLE

  async createConnection(connection: Partial<Connection>): Promise<Connection> {
    const { rows } = await this.pool.query<DbConnection>(
      "INSERT INTO connections(block_id,channel_id, user_id) VALUES ($1, $2, $3) RETURNING *",
      [connection.blockId, connection.channelId, connection.userId]
    );

    if (rows.length === 0) {
      throw new Error("DATABASE SERVICE: Error establishing a connection");
    }

    const dbConnection = rows[0];

    return {
      id: dbConnection.id,
      blockId: dbConnection.block_id,
      channelId: dbConnection.channel_id,
      userId: dbConnection.user_id,
      created: dbConnection.created,
    };
  }

  async getUserIdForBlock(blockId: string): Promise<string | null> {
    const { rows } = await this.pool.query<Pick<DbConnection, "user_id">>(
      "SELECT user_id FROM connections WHERE block_id=$1",
      [blockId]
    );

    if (rows.length === 0) {
      return null;
    }

    const blockUserId = rows[0].user_id;

    return blockUserId;
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
      throw new Error("DATABASE SERVICE: Connection not found.");
    }

    const foundConnection = rows[0];

    return foundConnection.id;
  }

  async getChannelIdsByBlockIdAndUserId(
    blockId: string,
    userId: string
  ): Promise<string[]> {
    const { rows } = await this.pool.query<Pick<DbConnection, "channel_id">>(
      "SELECT channel_id FROM connections WHERE block_id = $1 AND user_id = $2",
      [blockId, userId]
    );

    if (rows.length === 0) {
      return [];
    }

    const channelIds = rows.map((row) => row.channel_id);
    return channelIds;
  }

  //check if the same block is duplicated in a chanel
  async getExistingBlockIdInChanel(
    channelId: string,
    blockId: string
  ): Promise<string | null> {
    const query =
      "SELECT block_id FROM connections WHERE channel_id = $1 AND block_id = $2";

    const { rows } = await this.pool.query<Pick<DbConnection, "block_id">>(
      query,
      [channelId, blockId]
    );

    if (rows.length === 0) {
      return null;
    }

    const existingBlockId = rows[0].block_id;
    return existingBlockId;
  }

  async getConnectionsBySingleBlockId(
    blockId: string
  ): Promise<Connection[] | []> {
    const query = "SELECT * FROM connections WHERE block_id = $1";

    const { rows: connections } = await this.pool.query<DbConnection>(query, [
      blockId,
    ]);

    if (connections.length === 0) {
      return [];
    }

    const userConnections = mapConnections(connections);

    return userConnections;
  }

  async getConnectionsByGroupBlockIds(
    blockIds: string[]
  ): Promise<Connection[] | []> {
    const query = "SELECT * FROM connections WHERE block_id = ANY($1)";

    const { rows: connections } = await this.pool.query<DbConnection>(query, [
      blockIds,
    ]);

    if (connections.length === 0) {
      return [];
    }

    const userConnections = mapConnections(connections);

    return userConnections;
  }

  async getConnectionsByUserId(userId: string): Promise<Connection[]> {
    const { rows: connections } = await this.pool.query<DbConnection>(
      "SELECT * FROM connections WHERE user_id = $1",
      [userId]
    );

    if (connections.length === 0) {
      return [];
    }

    const userConnections = mapConnections(connections);

    return userConnections;
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

    const { rows: connections } = await this.pool.query(query, [userId]);

    if (connections.length === 0) {
      return [];
    }

    const mappedConnections = connections.map((connection) => {
      return {
        ...connection,
        imageData: connection.image_data,
        blockId: connection.block_id,
        channelId: connection.channel_id,
        userId: connection.user_id,
        imagePath: connection.image_path,
      };
    });

    return mappedConnections;
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
      "DELETE FROM connections WHERE id=$1 RETURNING *",
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
    const { rows: deletedConnections } = await this.pool.query<DbConnection>(
      "DELETE FROM connections WHERE channel_id=$1 RETURNING *",
      [channelId]
    );

    if (deletedConnections.length === 0) {
      return null;
    }

    return deletedConnections;
  }

  //BLOCKS TABLE
  async createBlock(block: Partial<Block>): Promise<Block> {
    const { rows } = await this.pool.query<DbBlock>(
      "INSERT INTO blocks(image_path,created) VALUES ($1, $2) RETURNING *",
      [block.imagePath, block.created]
    );

    if (rows.length === 0) {
      throw new Error("DATABASE SERVICE: Error uploading block");
    }

    const dbBlock = rows[0];

    return {
      id: dbBlock.id,
      created: dbBlock.created,
      imagePath: dbBlock.image_path,
      imageData: dbBlock.image_data,
    };
  }

  async createBlockByUpload(block: Partial<Block>): Promise<Block> {
    const { rows } = await this.pool.query<DbBlock>(
      "INSERT INTO blocks(created, image_data) VALUES ($1, $2) RETURNING *",
      [block.created, block.imageData]
    );

    if (rows.length === 0) {
      throw new Error("Error uploading image into block");
    }

    const dbBlock = rows[0];

    return {
      id: dbBlock.id,
      created: dbBlock.created,
      imagePath: dbBlock.image_path,
      imageData: dbBlock.image_data,
    };
  }

  async getBlocksByBlockIds(blockIds: string[]): Promise<Block[]> {
    const { rows: blocks } = await this.pool.query<DbBlock>(
      "SELECT * FROM blocks WHERE id = ANY($1)",
      [blockIds]
    );

    if (blocks.length === 0) {
      throw new Error("DATABASE SERVICE: Error retrieving block");
    }

    const userBlocks = mapBlocks(blocks);

    return userBlocks;
  }

  async deleteBlock(blockId: string): Promise<Block | null> {
    const { rows } = await this.pool.query(
      "DELETE FROM blocks WHERE id=$1 RETURNING *",
      [blockId]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async deleteMultipleBlocks(blockIds: string[]): Promise<DbBlock[] | null> {
    const { rows } = await this.pool.query<DbBlock>(
      "DELETE FROM blocks WHERE id = ANY($1) RETURNING *",
      [blockIds]
    );

    if (rows.length === 0) {
      return null;
    }

    const deletedBlocks = rows;

    return deletedBlocks;
  }

  //CHANNELS TABLE

  async createChannel(channel: Partial<Channel>): Promise<Channel> {
    const { rows } = await this.pool.query<DbChannel>(
      "INSERT INTO channels(title,is_private,created, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [channel.title, channel.isPrivate, channel.created, channel.userId]
    );

    if (rows.length === 0) {
      throw new Error(
        "DATABASE SERVICE: Error inserting channel into database"
      );
    }

    const dbChannel = rows[0];

    return {
      ...dbChannel,
      isPrivate: dbChannel.is_private,
      userId: dbChannel.user_id,
    };
  }

  async getChannelsByUserId(userId: string): Promise<Channel[]> {
    const { rows: channels } = await this.pool.query<DbChannel>(
      "SELECT * FROM channels WHERE user_id = $1",
      [userId]
    );

    if (channels.length === 0) {
      return [];
    }

    const userChannels = mapChannels(channels);

    return userChannels;
  }

  async getChannelsByChannelId(channelIds: string[]): Promise<Channel[]> {
    const { rows: channels } = await this.pool.query<DbChannel>(
      "SELECT * FROM channels WHERE id = ANY($1)",
      [channelIds]
    );

    if (channels.length === 0) {
      throw new Error("DATABASE SERVICE: Error retrieving channels for block");
    }

    const userChannels = mapChannels(channels);

    return userChannels;
  }

  async updateChannel(
    title: string,
    isPrivate: boolean,
    channelId: string
  ): Promise<Channel> {
    const { rows } = await this.pool.query<DbChannel>(
      "UPDATE channels SET title = $1, is_private = $2 WHERE id = $3 RETURNING *",
      [title, isPrivate, channelId]
    );

    if (rows.length === 0) {
      throw new Error("DATABASE SERVICE: Error updating channel");
    }

    const updatedChannel = rows[0];

    return {
      id: updatedChannel.id,
      title: updatedChannel.title,
      isPrivate: updatedChannel.is_private,
      created: updatedChannel.created,
      updated: updatedChannel.updated,
      userId: updatedChannel.user_id,
    };
  }

  async deleteChannel(channelId: string): Promise<DbChannel | null> {
    const { rows } = await this.pool.query<DbChannel>(
      "DELETE FROM channels WHERE id=$1 RETURNING *",
      [channelId]
    );

    if (rows.length === 0) {
      return null;
    }

    const deletedChannel = rows[0];

    return deletedChannel;
  }
}
