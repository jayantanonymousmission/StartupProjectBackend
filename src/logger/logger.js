//import some libraries and functions
import pino from "pino";

//create function
const logger=pino({
    transport:{
        target:"pino-pretty",
        options:{
            colorize:true,
            translateTime:"SYS-standard",
            ignore:"pid,hotname"
        }
    },
});

//export the functions or class for using functionality globally
export default logger;