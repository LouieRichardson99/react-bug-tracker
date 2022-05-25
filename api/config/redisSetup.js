const session = require("express-session");
const { createClient } = require("redis");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const RedisStore = require("connect-redis")(session);

const redisClient = createClient({
  legacyMode: true,
  url: `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

module.exports = { RedisStore, redisClient };
