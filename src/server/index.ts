import express from "express";
import cors from "cors";
import { pool } from "./db.ts";
import { DatabaseService } from "./services/database.service.ts";
import { UserService } from "./services/user.service.ts";
import { createJwt } from "./utils.ts";
import { config } from "dotenv";
import { authMiddleware } from "./middleware/auth.middleware.ts";

config();

const app = express();

const databaseService = new DatabaseService(pool);
const userService = new UserService(databaseService);

//middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.listen(4000, () => {
  console.log("server has started on port 4000");
});

//Routes

app.get("/user/blocks", authMiddleware, async (req, res) => {
  const { id } = req.user;

  try {
    const blocks = await userService.getUserBlocks(id);

    return res.status(200).json(blocks);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: "Error retrieving blocks." });
    }
  }
  res.status(200).json("blocks retrieved successfully");
});

app.get("/user/channels", authMiddleware, async (req, res) => {
  const { id } = req.user;

  try {
    const channels = await databaseService.getChannelsByUserId(id);

    return res.status(200).json(channels);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: "Error retrieving channels." });
    }
  }
  res.status(200).json("channels retrieved successfully");
});

app.get("/user/channels/connections", authMiddleware, async (req, res) => {
  const { id } = req.user;

  try {
    const connectionsWithImagePath =
      await databaseService.getConnectionsWithImagePath(id);

    return res.status(200).json(connectionsWithImagePath);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error retrieving connections with image path." });
  }
});

app.post("/channels/create", authMiddleware, async (req, res) => {
  const userId = req.user?.id;
  try {
    const { title, is_private } = req.body;

    const created = new Date();

    await databaseService.createChannel({
      title,
      created,
      is_private,
      user_id: userId,
    });

    res.status(200).json("channel added successfully");
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(`Error creating channel, ${error.message}`);
    }
  }
});

app.post("/blocks/create", authMiddleware, async (req, res) => {
  try {
    const { image_path, channelId } = req.body;
    const userId = req.user?.id;

    const created = new Date();

    const block = await databaseService.createBlock({
      image_path,
      created,
    });

    await databaseService.createConnection({
      block_id: block.id,
      channel_id: channelId,
      user_id: userId,
    });

    res.status(200).json("block added successfully");
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(`Error adding block, ${error.message}`);
    }
  }
});

app.post("/blocks/upload", authMiddleware, async (req, res) => {
  try {
    const { image_data, channelId } = req.body;
    const userId = req.user?.id;

    const created = new Date();

    const block = await databaseService.createBlockByUpload({
      image_data,
      created,
    });

    await databaseService.createConnection({
      block_id: block.id,
      channel_id: channelId,
      user_id: userId,
    });

    res.status(200).json("block added successfully");
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(`Error adding block, ${error.message}`);
    }
  }
});

app.post("/connections/create", authMiddleware, async (req, res) => {
  const { id } = req.user;

  try {
    const { block_id, channel_id } = req.body;

    const created = new Date();

    await databaseService.createConnection({
      block_id,
      channel_id,
      user_id: id,
      created,
    });

    res.status(200).json("connection established successfully");
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(`Error establishing connection, ${error.message}`);
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

    res.status(200).json("Sign up successful");
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(`Error registering, ${error.message}`);
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
      res.status(400).json(`Error registering, ${error.message}`);
    }
  }
});

app.delete("/user/block/delete", authMiddleware, async (req, res) => {
  const { id } = req.user;

  try {
    const { blockId } = req.body;
    const deletedBlock = await userService.deleteUserBlock(blockId, id);

    return res.status(200).json(deletedBlock);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(`Error deleting block, ${error.message}`);
    }
  }
});

app.delete("/user/channel/delete", authMiddleware, async (req, res) => {
  try {
    const { channelId } = req.body;
    const deletedChannel = await userService.deleteChannel(channelId);

    return res.status(200).json(deletedChannel);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(`Error deleting channel, ${error.message}`);
    }
  }
});
