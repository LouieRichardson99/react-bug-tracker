const { redisClient, RedisStore } = require("./redisSetup");

const sessionOptions = {
  store: new RedisStore({
    client: redisClient,
  }),
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  resave: false,
  cookie: {
    sameSite: true,
  },
};

module.exports = sessionOptions;
