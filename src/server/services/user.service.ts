import { DatabaseService, DbUser, User } from "./database.service";
import { hashAndSaltUserPassword, verifyPassword } from "../utils";

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

  // async verifyUserCredentials(username: string, password: string): Promise<boolean> {
  //     const userExists = await this.DatabaseService.userExists(username);

  //     if (!userExists) {
  //       return false;
  //     }

  //     const user = await this.DatabaseService.getUser(username);
  //     if (!user) {
  //       return false;
  //     }

  //     return verifyPassword(password, user.salt, user.password);
  //   }
}
