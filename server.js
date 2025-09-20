// server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./src/routes/authRoutes/authRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";


// ✅ CORS middleware
app.use(cors({
  origin:"*",
}));

// Security + logging
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("dev"));

// JSON parser
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Start server
app.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://${HOST}:${PORT}`);
});
