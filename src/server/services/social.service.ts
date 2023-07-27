import { DatabaseService } from "./database.service";
import { hashAndSaltUserPassword, mapConnections } from "../utils";
import { DbConnection, DbUser } from "../types";
import { Connection } from "../../common/types";
import { Pool } from "pg";

export class SocialService {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }
  async getSocialConnections(userId: string): Promise<Connection[]> {
    const query =
      "SELECT * FROM connections WHERE user_id NOT IN (SELECT user_id FROM connections WHERE user_id = $1) AND created >= NOW() - INTERVAL '10 days'";

    const { rows: connections } = await this.pool.query<DbConnection>(query, [
      userId,
    ]);

    if (connections.length === 0) {
      throw new Error(
        "SOCIAL SERVICE: No social connections in the last 10 days"
      );
    }

    const mappedConnections = mapConnections(connections);

    return mappedConnections;
  }
}
