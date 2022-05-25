const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const port = 8080;
const cloudinary = require("cloudinary");
const sessionOptions = require("./sessionOptions");
const { redisClient } = require("./redisSetup");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

redisClient.connect().catch(console.error());

app.use(session(sessionOptions));
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const indexRoute = require("../lib/routes/index");
const userRoute = require("../lib/routes/user.route");

app.use("/", indexRoute);
app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} 🚀`);
});
