//configure dotenv for implementing the env configuration or variables
import dotenv from "dotenv";
dotenv.config();

//import some libraries and functions
import app from "./app.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import logger from "./src/logger/logger.js";

//variable:
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

// ✅ allowed origins list
const allowedOrigins = [
  "https://startup-project.netlify.app",   // production frontend
  "http://localhost:3000",                 // dev (react)
  "http://127.0.0.1:3000",
  /^http:\/\/localhost:\d+$/,              // allow any random localhost port
  /^http:\/\/127\.0\.0\.1:\d+$/            // allow any random 127.x.x.x port
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server / curl
    if (
      allowedOrigins.includes(origin) ||
      allowedOrigins.some(o => o instanceof RegExp && o.test(origin))
    ) {
      callback(null, true);
    } else {
      console.warn("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ handle preflight (important for Chrome)
app.options("*", cors());
//Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false,  // ⚠️ to avoid blocking frontend resources
}));
app.use(morgan("dev"));

//Start Server
app.listen(port, host, (err) => {
  if (err) {
    logger.error(`Server is not running on http://${host}:${port}`, err);
    process.exit(0);
  } else {
    logger.info(`✅ Server is running on http://${host}:${port}`);
  }
});

//Graceful shutdown
process.on("SIGINT", (err) => {
  if (err) logger.error("Server is not shutting down properly", err);

  logger.info("Server is shutting down successfully");
  process.exit(0);
});
