//import some libraries and functions
import dotenv from 'dotenv';
dotenv.config();

//make function
const variables={
    host:process.env.HOST || "localhost",
    port:process.env.PORT || 3000,
    url:process.env.URL,
    userMail:process.env.USER_MAIL,
    userPass:process.env.USER_PASS,
    superAdminCode:process.env.SUPER_ADMIN_CODE,
    adminCode:process.env.ADMIN_CODE,
    employeeCode:process.env.EMPLOYEES_CODE,
    workerCode:process.env.WORKERS_CODE,
    tokenKey:process.env.TOKEN_KEY
}

//export the functions or class for using functionality globally
export default variables;