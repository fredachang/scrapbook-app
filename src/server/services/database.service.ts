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
        b.image_path
      FROM 
        connections c
      JOIN 
        blocks b ON c.block_id = b.id
      WHERE 
        c.user_id = $1;
    `;

    const { rows: connections } = await this.pool.query(query, [id]);
    if (connections.length === 0) {
      throw new Error("Error retrieving connection with image path");
    }

    return connections;
  }

  async getBlocksByBlockIds(blockIds: string[]): Promise<Block[]> {
    const { rows: blocks } = await this.pool.query(
      "SELECT * FROM blocks WHERE id = ANY($1)",
      [blockIds]
    );

    console.log("in blocks database services");

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
