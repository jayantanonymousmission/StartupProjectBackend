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

// ✅ Allowed origins (production + dev)
const allowedOrigins = [
  "https://startup-project.netlify.app",   // production frontend
  "http://localhost:3000",                 // local React dev
  "http://127.0.0.1:3000",                 // localhost alias
  "http://localhost:5000",                 // flutter web dev (kabhi is port pe bhi run hota hai)
];

//make middlewares
//CORS Middleware (Production-safe)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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
