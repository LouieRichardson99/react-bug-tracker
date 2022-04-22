const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const port = 8080;
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");

app.use(cookieParser());

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });

// Redis setup
const RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");
const redisClient = createClient({
  legacyMode: true,
  url: `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
redisClient.connect().catch(console.error());

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// CORS setup
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Sessions
app.use(
  session({
    store: new RedisStore({
      client: redisClient,
    }),
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: {
      sameSite: true,
    },
  })
);

app.use(express.json()); // Access request body

// Import routes
const indexRoute = require("./routes/index");
const userRoute = require("./routes/user.route");

// Routes
app.use("/", indexRoute);
app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} 🚀`);
});
