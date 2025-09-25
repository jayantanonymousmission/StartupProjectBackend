//import some libraries and functions
import express from"express";
import routes from "./src/routes/authRoutes/authRoute.js"
import db from"./src/config/databaseConnectivity.js";

//make instance variable of express
const app=express();
app.set("trust proxy",1);

//use database connection
db();

//use middlwares 
app.use(express.json());

//for routes
app.use("/auth",routes);

//export the functions or class for using functionality globally
export default app;