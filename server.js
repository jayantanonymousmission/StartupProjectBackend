// server.js
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./src/routes/authRoutes/authRoute.js";
import variables from "./src/storage/env/envConstants.js";

// ✅ CORS middleware
app.use(cors({
   origin:"http://localhost:57896", // Match Flutter web origin
  credentials: true

}));
// Security + logging
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/auth", authRoutes);

// Start server
app.listen(variables.port,variables.host, () => {
  console.log(`✅ Server running at http://${variables.host}:${variables.port}`);
});
