// server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./src/routes/authRoutes/authRoute.js";
import variables from "./src/storage/env/envConstants.js";

const app = express();

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
app.listen(variables.port, variables.host, () => {
  console.log(`✅ Server running at http://${variables.host}:${variables.port}`);
});
