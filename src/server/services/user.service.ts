import { DatabaseService } from "./database.service";
import { hashAndSaltUserPassword, verifyPassword } from "../utils";
import { Block, Channel, Connection } from "../../common/types";
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

    if (userExists) {
      throw new Error("User already exists");
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
    const userExists = await this.databaseService.emailExists(email);

    if (!userExists) {
      throw new Error("User already exists");
    }

    const user = await this.databaseService.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const salt = user.salt;
    const hashedUserPassword = user.password;

    const isValidPassword = verifyPassword(password, salt, hashedUserPassword);

    if (isValidPassword) {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        created: user.created,
      };
    }

    throw new Error("Invalid user credentials");
  }

  async getUserBlocks(userId: string): Promise<Block[]> {
    const connections = await this.databaseService.getConnectionsByUserId(
      userId
    );

    if (connections.length === 0) {
      throw new Error("No connection found by userID");
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
      throw new Error("Error retrieving channels for blocks");
    }

    const channels = await this.databaseService.getChannelsByChannelId(
      channelsIds
    );

    return channels;
  }

  async deleteUserBlock(
    blockId: string,
    userId: string
  ): Promise<Block | null> {
    const blockUserId = await this.databaseService.getUserIdForBlock(blockId);

    if (!blockUserId) {
      throw new Error("getBlockUserId failed");
    }

    //check if block to be deleted belongs to the user
    if (userId !== blockUserId) {
      throw new Error(
        "No permission to delete block as you are not the user that created it"
      );
    }

    //delete ALL the connections associated with the blockID (note this deletes connections saved by other users)

    const deletedConnection =
      await this.databaseService.deleteConnectionsByBlockId(blockId);

    if (!deletedConnection) {
      throw new Error("connections deletion failed");
    }

    const deletedBlock = await this.databaseService.deleteBlock(blockId);

    if (!deletedBlock) {
      throw new Error("block deletion failed");
    }
    return deletedBlock;
  }

  async deleteConnection(
    connectionId: string,
    blockId: string
  ): Promise<DbConnection | Block | null> {
    const deletedConnection =
      await this.databaseService.deleteConnectionByConnectionId(connectionId);

    if (!deletedConnection) {
      throw new Error("error deleting connection");
    }

    //check if its the only connection, if so, delete the block

    const duplicateBlockIds =
      await this.databaseService.getDuplicateBlocksAcrossChanels();

    if (duplicateBlockIds.length === 0) {
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

    const blockIdsToDelete = deletedConnections.map(
      (connection: DbConnection) => {
        return connection.block_id;
      }
    );

    //check if the blocks are connected to other channels
    const duplicateBlockIds =
      await this.databaseService.getDuplicateBlocksAcrossChanels();

    //if the blocks arent connected to other channels, delete the blocks
    if (duplicateBlockIds.length === 0) {
      const deletedBlocks = await this.databaseService.deleteMultipleBlocks(
        blockIdsToDelete
      );
      return deletedBlocks;
    }
    //if there are duplicate block ids (ie connected to other channels)
    const uniqueBlockIdsToDelete = blockIdsToDelete.filter(
      (blockId) => !duplicateBlockIds.includes(blockId)
    );

    const uniqueDeletedBlocks = await this.databaseService.deleteMultipleBlocks(
      uniqueBlockIdsToDelete
    );

    const deletedChannel = await this.databaseService.deleteChannel(channelId);

    return { deletedChannel, uniqueDeletedBlocks };
  }
}
