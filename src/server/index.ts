import express from "express";
import cors from "cors";
import { pool } from "./db";
import { DatabaseService } from "./services/database.service";
import { UserService } from "./services/user.service";
import { convertTime, createJwt, restructureFeeds } from "./utils";
import { config } from "dotenv";
import { authMiddleware } from "./middleware/auth.middleware";
import { SocialService } from "./services/social.service";
import path from "path";
import history from "connect-history-api-fallback";

config();

const app = express();

const databaseService = new DatabaseService(pool);
const socialService = new SocialService(pool);
const userService = new UserService(databaseService);

const run = () => {
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));

  app.get("/user/blocks", authMiddleware, async (req, res) => {
    const { id } = req.user;

    try {
      const blocks = await userService.getUserBlocks(id);

      return res.status(200).json(blocks);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ error: "EXPRESS: Error retrieving blocks." });
      }
    }
    res.status(200).json("EXPRESS: blocks retrieved successfully");
  });

  app.get(
    "/user/block/connectionid/:blockId/:channelId",
    authMiddleware,
    async (req, res) => {
      try {
        const { blockId, channelId } = req.params;

        const connectionId = await databaseService.getConnectionId(
          blockId,
          channelId
        );

        return res.status(200).json(connectionId);
      } catch (error) {
        if (error instanceof Error) {
          return res
            .status(500)
            .json({ error: "EXPRESS: Error retrieving connectionId." });
        }
      }
      res.status(200).json("EXPRESS: connectionid retrieved successfully");
    }
  );

  app.get("/user/channels", authMiddleware, async (req, res) => {
    const { id } = req.user;

    try {
      const channels = await databaseService.getChannelsByUserId(id);

      return res.status(200).json(channels);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ error: "EXPRESS: Error retrieving channels." });
      }
    }
    res.status(200).json("EXPRESS: channels retrieved successfully");
  });

  app.get("/user/:blockId/channels", authMiddleware, async (req, res) => {
    const { id } = req.user;
    try {
      const { blockId } = req.params;

      const channelTitles = await userService.getBlockChannels(blockId, id);

      return res.status(200).json(channelTitles);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ error: "EXPRESS: Error retrieving channel titles." });
      }
    }
    res.status(200).json("EXPRESS: channels retrieved successfully");
  });

  app.get("/user/channels/connections", authMiddleware, async (req, res) => {
    const { id } = req.user;

    try {
      const connectionsWithImagePath =
        await databaseService.getConnectionsWithImagePath(id);

      return res.status(200).json(connectionsWithImagePath);
    } catch (err) {
      return res.status(500).json({
        error: "EXPRESS: Error retrieving connections with image path.",
      });
    }
  });

  app.get("/user/feed", authMiddleware, async (_, res) => {
    try {
      const socialConnections = await socialService.getSocialConnections();

      const socialConnectionsByDay = socialConnections.map((connection) => ({
        ...connection,
        created: convertTime(connection.created),
      }));

      const mappedFeeds = restructureFeeds(socialConnectionsByDay);

      return res.status(200).json(mappedFeeds);
    } catch (err) {
      return res.status(500).json({
        error: "EXPRESS: Error retrieving social connections.",
      });
    }
  });

  app.get("/:userId/channels", authMiddleware, async (req, res) => {
    try {
      const { userId } = req.params;

      const otherUserChannels = await databaseService.getOtherChannelByUserId(
        userId
      );

      return res.status(200).json(otherUserChannels);
    } catch (err) {
      return res.status(500).json({
        error: "EXPRESS: Error retrieving other user's channels.",
      });
    }
  });

  app.get("/:userId/blocks", authMiddleware, async (req, res) => {
    try {
      const { userId } = req.params;

      const otherUserBlocks = await userService.getUserBlocks(userId);

      return res.status(200).json(otherUserBlocks);
    } catch (err) {
      return res.status(500).json({
        error: "EXPRESS: Error retrieving other user's blocks.",
      });
    }
  });

  app.get("/:userId/connections", authMiddleware, async (req, res) => {
    try {
      const { userId } = req.params;

      const otheruseConnections =
        await databaseService.getConnectionsWithImagePath(userId);

      return res.status(200).json(otheruseConnections);
    } catch (err) {
      return res.status(500).json({
        error: "EXPRESS: Error retrieving other user's connections.",
      });
    }
  });

  app.post("/channels/create", authMiddleware, async (req, res) => {
    const userId = req.user?.id;
    try {
      const { title, isPrivate } = req.body;

      const created = new Date();

      await databaseService.createChannel({
        title,
        created,
        isPrivate,
        userId: userId,
      });

      res.status(200).json("channel added successfully");
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json(`EXPRESS: Error creating channel, ${error.message}`);
      }
    }
  });

  app.post("/blocks/create", authMiddleware, async (req, res) => {
    const userId = req.user?.id;
    try {
      const { imagePath, channelId } = req.body;

      const created = new Date();

      const block = await databaseService.createBlock({
        imagePath,
        created,
      });

      await databaseService.createConnection({
        blockId: block.id,
        channelId: channelId,
        userId: userId,
      });

      res.status(200).json("EXPRESS: block added successfully");
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json(`EXPRESS: Error adding block, ${error.message}`);
      }
    }
  });

  app.post("/createchannelandconnect", authMiddleware, async (req, res) => {
    const userId = req.user?.id;
    try {
      const { title, isPrivate, blockId } = req.body;

      const created = new Date();

      const channel = await databaseService.createChannel({
        title,
        created,
        isPrivate,
        userId: userId,
      });

      await databaseService.createConnection({
        blockId: blockId,
        channelId: channel.id,
        userId: userId,
      });

      res
        .status(200)
        .json("EXPRESS: channel and connection created successfully");
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json(
            `EXPRESS: Error creating channel and connection, ${error.message}`
          );
      }
    }
  });

  app.post("/blocks/createtext", authMiddleware, async (req, res) => {
    const userId = req.user?.id;
    try {
      const { text, channelId } = req.body;

      const created = new Date();

      const block = await databaseService.createBlockWithText({
        text,
        created,
      });

      await databaseService.createConnection({
        blockId: block.id,
        channelId: channelId,
        userId: userId,
      });

      res.status(200).json("EXPRESS: block added successfully with text");
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json(`EXPRESS: Error adding block with text, ${error.message}`);
      }
    }
  });

  app.post("/blocks/upload", authMiddleware, async (req, res) => {
    try {
      const { imageData, channelId } = req.body;
      const userId = req.user?.id;

      const created = new Date();

      const block = await databaseService.createBlockByUpload({
        imageData,
        created,
      });

      await databaseService.createConnection({
        blockId: block.id,
        channelId: channelId,
        userId: userId,
      });

      res.status(200).json("EXPRESS: block added successfully");
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json(`EXPRESS: Error adding block, ${error.message}`);
      }
    }
  });

  app.post("/channel/update", authMiddleware, async (req, res) => {
    try {
      const { title, isPrivate, channelId } = req.body;

      const updatedChannel = await databaseService.updateChannel(
        title,
        isPrivate,
        channelId
      );

      res.status(200).json(updatedChannel);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json(`EXPRESS: Error updating channel, ${error.message}`);
      }
    }
  });

  app.post("/connections/create", authMiddleware, async (req, res) => {
    const { id } = req.user;

    try {
      const { blockId, channelId } = req.body;

      const duplicateBlockId = await databaseService.getExistingBlockIdInChanel(
        channelId,
        blockId
      );

      if (!duplicateBlockId) {
        const created = new Date();

        const connectionVariables = {
          blockId,
          channelId,
          userId: id,
          created,
        };

        await databaseService.createConnection(connectionVariables);

        res.status(200).json("EXPRESS: connection established successfully");
      }
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json(`EXPRESS: Error establishing connection, ${error.message}`);
      }
    }
  });

  app.post("/auth/register", async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      await userService.registerUser({
        email,
        password,
        firstName,
        lastName,
      });

      return res.status(200).json("EXPRESS: Sign up successful");
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(400)
          .json(`EXPRESS: Error registering, ${error.message}`);
      }
    }
  });

  app.post("/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userService.verifyUserCredentials(email, password);
      const jwt = createJwt({ user }, process.env.AUTH_SECRET!);

      return res.status(200).json(jwt);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400);
      }
      return res.status(400);
    }
  });

  app.delete(
    "/user/channel/delete/:channelId",
    authMiddleware,
    async (req, res) => {
      try {
        const { channelId } = req.params;
        await userService.deleteChannel(channelId);

        return res.status(200).json("channel deleted");
      } catch (error) {
        if (error instanceof Error) {
          res
            .status(400)
            .json(`EXPRESS: Error deleting channel, ${error.message}`);
        }
      }
    }
  );

  app.delete(
    "/user/connection/delete/:connectionId/:blockId",
    authMiddleware,
    async (req, res) => {
      try {
        const { connectionId, blockId } = req.params;

        const deleted = await userService.deleteConnection(
          connectionId,
          blockId
        );

        return res.status(200).json(deleted);
      } catch (error) {
        if (error instanceof Error) {
          res
            .status(400)
            .json(`EXPRESS: Error deleting connection, ${error.message}`);
        }
      }
    }
  );

  app.use(history());

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client")));
  }

  app.listen(4000, () => {
    console.log(
      `EXPRESS: server has started on port 4000, in NODE_ENV ${
        process.env.NODE_ENV ?? "development"
      }`
    );
  });
};

run();
