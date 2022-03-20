const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const port = 8080;

// Redis setup
let RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");
let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Automatically send cookies along with each req
  })
);

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });

// Sessions
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: "keyboard cat",
    resave: false,
  })
);

app.use(express.json()); // Access request body

// Import routes
const indexRoute = require("./routes/index");
const userRoute = require("./routes/user.route");

// Routes
app.use("/", indexRoute);
app.use("/users", userRoute);

app.use("/profile", (req, res) => {
  res.json({ Session: req.session, SID: req.sessionID });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
