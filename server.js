//configure dotenv for implementing the env configuration or varibles
import dotenv from "dotenv";
dotenv.config();

//import some libraries and functions
import app from "./app.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import logger from "./src/logger/logger.js";
import variables from "./src/storage/env/envConstants.js";

//make middlwares
//for solving problems of different ports
app.use(cors({origin: "https://startup-project-wc1a.onrender.com",credentials: true}));

//Security Moddlewares
app.use(helmet());
app.use(morgan("dev"));

app.listen(variables.port,variables.host,(err)=>{
    if(err){
        logger.error(`Server is not running on:https://{variables.port}:{variables.host}`,err);
        process.exit(0);
    }
    else
        logger.info("Server is Created Successfully");
});

process.on("SIGINT",(err)=>{
    if(err)
        logger.error("Server is not shutting down properly",err);

    logger.info("Server is shutting down successfully");
    process.exit(0);
})
