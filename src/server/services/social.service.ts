import { mapFeeds } from "../utils";
import { DbFeed } from "../types";
import { Feed } from "../../common/types";
import { Pool } from "pg";

export class SocialService {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  //this looks for connections in the last 10 days by other users
  //organise them chronologically by user_id, channel_id, block_id and
  //joins user and channel names as well as block data
  async getSocialConnections(userId: string): Promise<Feed[]> {
    const query =
      "SELECT c.*, u.first_name,u.last_name, ch.title as channel_title, b.image_path, b.image_data FROM connections c JOIN users u ON c.user_id = u.id JOIN channels ch ON c.channel_id = ch.id LEFT JOIN blocks b ON c.block_id = b.id WHERE c.user_id NOT IN (SELECT user_id FROM connections WHERE user_id = $1) AND c.created >= NOW() - INTERVAL '10 days' AND NOT ch.is_private ORDER BY c.created DESC, c.user_id, c.channel_id, c.block_id";

    const { rows: feeds } = await this.pool.query<DbFeed>(query, [userId]);

    if (feeds.length === 0) {
      return [];
    }

    const mappedFeeds = mapFeeds(feeds);

    return mappedFeeds;
  }
}
