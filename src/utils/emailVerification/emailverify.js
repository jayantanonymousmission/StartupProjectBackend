//import some libraries and functions
import nodemailer from 'nodemailer';
import variables from '../../storage/env/envConstants.js';

//function handler for sending email
const sendEmail=async(gmail,message,text)=>{
    const transport=await nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth:{
            user:variables.userMail,
            pass:variables.userPass,
        }
    });
    await transport.sendMail({
        from:variables.userMail,
        to:gmail,
        message,
        text,
    });
}

//export the functions or class for using functionality globally
export default sendEmail;