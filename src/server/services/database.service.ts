import { Pool } from "pg";
import { Block, Channel, Connection } from "../../common/types";

export interface DbUser {
  id: string;
  email: string;
  salt: string;
  password: string;
  firstName: string;
  lastName: string;
  created: Date;
  updated: Date;
}

export interface DbConnection {
  id: string;
  block_id: string;
  channel_id: string;
  user_id: string;
  created: Date;
  image_path: string | null;
  image_data: ArrayBuffer | null;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  created: Date;
}

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
    const { rows } = await this.pool.query(
      "INSERT INTO channels(title,is_private,created, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [channel.title, channel.is_private, channel.created, channel.user_id]
    );

    if (rows.length === 0) {
      throw new Error("Error inserting channel into database");
    }

    return rows[0];
  }

  async createBlock(block: Partial<Block>): Promise<Block> {
    const { rows } = await this.pool.query(
      "INSERT INTO blocks(image_path,created) VALUES ($1, $2) RETURNING *",
      [block.image_path, block.created]
    );

    if (rows.length === 0) {
      throw new Error("Error uploading block");
    }

    return rows[0];
  }

  async createBlockByUpload(block: Partial<Block>): Promise<Block> {
    const { rows } = await this.pool.query(
      "INSERT INTO blocks(created, image_data) VALUES ($1, $2) RETURNING *",
      [block.created, block.image_data]
    );

    if (rows.length === 0) {
      throw new Error("Error uploading image into block");
    }

    return rows[0];
  }

  async createConnection(connection: Partial<Connection>): Promise<Connection> {
    const { rows } = await this.pool.query(
      "INSERT INTO connections(block_id,channel_id, user_id) VALUES ($1, $2, $3) RETURNING *",
      [connection.block_id, connection.channel_id, connection.user_id]
    );

    if (rows.length === 0) {
      throw new Error("Error establishing a connection");
    }

    return rows[0];
  }

  async getConnectionsByUserId(id: string): Promise<Connection[]> {
    const { rows: connections } = await this.pool.query(
      "SELECT * FROM connections WHERE user_id = $1",
      [id]
    );

    if (connections.length === 0) {
      throw new Error("Error retrieving connection");
    }

    return connections;
  }

  async getChannelsByUserId(id: string): Promise<Channel[]> {
    const { rows: channels } = await this.pool.query(
      "SELECT * FROM channels WHERE user_id = $1",
      [id]
    );

    if (channels.length === 0) {
      throw new Error("Error retrieving connection");
    }

    return channels;
  }

  async getConnectionsWithImagePath(id: string): Promise<Connection[]> {
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
      id,
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
        image_data: base64Image,
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

    return blocks;
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
  ): Promise<DbConnection | null> {
    const { rows } = await this.pool.query(
      "DELETE FROM connections WHERE block_id=$1",
      [blockId]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async getDuplicateBlockIds(): Promise<string[] | []> {
    const { rows: duplicateBlocks } = await this.pool.query(
      "SELECT ARRAY_AGG(block_id) AS unique_block_ids, COUNT(*) AS duplication_count FROM connections GROUP BY block_id HAVING COUNT(*) > 1 "
    );

    if (duplicateBlocks.length === 0) {
      return [];
    }

    return duplicateBlocks.map((row) => row.unique_block_ids);
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
