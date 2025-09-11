//import some libraries and functions
import nodemailer from 'nodemailer';
import variables from '../../storage/env/envConstants.js';

//function handler for sending email
const sendEmail=async(gmail,subject,text)=>{
    const transport=nodemailer.createTransport({
        service:gmail,
        auth:{
            user:variables.userMail,
            pass:variables.userPass,
        }
    });
    await transport.sendMail({
        from:variables.userMail,
        to:gmail,
        subject:subject,
        text:text,
    });
}

//export the functions or class for using functionality globally
export default sendEmail;