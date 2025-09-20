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
  /^http:\/\/localhost:\d+$/,           // allow any random 127.x.x.x port
];

app.use((req, res, next) => {
  const origin = req.headers.origin || "no origin (server request)";
  console.log("🌐 Incoming request:", req.method, req.url, "Origin:", origin);
  next();
});

app.use(cors({
  origin: function(origin, callback) {
    if (!origin){
        console.log("✅ Server to Server request or curl, no origin");
        return callback(null, true);
    }
    const allowed = allowedOrigins.some(o => o instanceof RegExp ? o.test(origin) : o === origin);
    if (allowed) {
        callback(null, true);
    } else {
        console.warn("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));


// ✅ handle preflight (important for Chrome)
app.use(/(.*)/, cors());
//Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false,  // ⚠️ to avoid blocking frontend resources
}));
app.use(morgan("dev"));

//Start Server
app.listen(port, host, (err) => {
  if (err) {
    logger.error(`Server is not running on http://${host}:${port}`, err);
    process.exit(1);
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
