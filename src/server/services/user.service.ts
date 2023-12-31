import { DatabaseService } from "./database.service";
import { hashAndSaltUserPassword, mapUser, verifyPassword } from "../utils";
import { Block, Channel } from "../../common/types";
import { DbConnection, DbUser, User } from "../types";

export class UserService {
  databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  async registerUser(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<DbUser> {
    const userExists = await this.databaseService.emailExists(data.email);
    console.log({ userExists });

    if (userExists) {
      throw new Error("USER SERVICE: User already exists");
    }

    const { salt, hashedPassword } = hashAndSaltUserPassword(data.password);
    const createdAt = new Date();

    return this.databaseService.writeUser({
      ...data,
      salt,
      password: hashedPassword,
      created: createdAt,
    });
  }

  async verifyUserCredentials(email: string, password: string): Promise<User> {
    const dbUser = await this.databaseService.getUserByEmail(email);

    if (!dbUser) {
      throw new Error(
        "Invalid Email. Please check spelling or register as a new user."
      );
    }

    const salt = dbUser.salt;
    const hashedUserPassword = dbUser.password;

    const isValidPassword = verifyPassword(password, salt, hashedUserPassword);

    if (!isValidPassword) {
      throw new Error("Invalid password. Please check spelling.");
    }
    return mapUser(dbUser);
  }

  async getUserBlocks(userId: string): Promise<Block[] | []> {
    const connections = await this.databaseService.getConnectionsByUserId(
      userId
    );

    if (connections.length === 0) {
      return [];
    }

    const blockIds = connections.map((connection) => connection.blockId);

    const blocks = await this.databaseService.getBlocksByBlockIds(blockIds);
    return blocks;
  }

  async getBlockChannels(blockId: string, userId: string): Promise<Channel[]> {
    const channelsIds =
      await this.databaseService.getChannelIdsByBlockIdAndUserId(
        blockId,
        userId
      );

    if (channelsIds.length === 0) {
      return [];
    }

    const channels = await this.databaseService.getChannelsByChannelId(
      channelsIds
    );

    return channels;
  }

  async deleteConnection(
    connectionId: string,
    blockId: string
  ): Promise<DbConnection | Block | null> {
    const deletedConnection =
      await this.databaseService.deleteConnectionByConnectionId(connectionId);

    if (!deletedConnection) {
      throw new Error("USER SERVICE: error deleting connection");
    }

    //check if its the only connection, if so, delete the block

    const duplicateBlocks =
      await this.databaseService.getConnectionsBySingleBlockId(blockId);

    if (duplicateBlocks.length === 0) {
      const deletedBlock = await this.databaseService.deleteBlock(blockId);
      return deletedBlock;
    }
    return deletedConnection;
  }

  async deleteChannel(channelId: string): Promise<any | null> {
    const deletedConnections =
      await this.databaseService.deleteConnectionsByChannelId(channelId);

    //if the channel does not contain any connection
    if (!deletedConnections) {
      const deletedChannel = await this.databaseService.deleteChannel(
        channelId
      );
      return deletedChannel;
    }
    //if the channel has connections

    const blockIdsOfDeletedConnections = deletedConnections.map(
      (connection) => {
        return connection.block_id;
      }
    );

    //find if there are connections in other channels with the same block id

    const duplicateConnections =
      await this.databaseService.getConnectionsByGroupBlockIds(
        blockIdsOfDeletedConnections
      );

    //if not, these blocks are deleted (the blocks in this channel are unique)
    if (duplicateConnections.length === 0) {
      await this.databaseService.deleteMultipleBlocks(
        blockIdsOfDeletedConnections
      );

      const deletedChannel = await this.databaseService.deleteChannel(
        channelId
      );
      return deletedChannel;
    }

    //if yes, compare the blockIds of the duplicate with the connections and delete blocks that exist independently

    const duplicateBlockIds = duplicateConnections.map((connection) => {
      return connection.blockId;
    });

    const uniqueBlockIdsToDelete = blockIdsOfDeletedConnections.filter(
      (blockId) => !duplicateBlockIds.includes(blockId)
    );

    const uniqueDeletedBlocks = await this.databaseService.deleteMultipleBlocks(
      uniqueBlockIdsToDelete
    );

    const deletedChannel = await this.databaseService.deleteChannel(channelId);

    return { deletedChannel, uniqueDeletedBlocks };
  }
}
