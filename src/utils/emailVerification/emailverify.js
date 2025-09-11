//import some libraries and functions
import nodemailer from 'nodemailer';
import variables from '../../storage/env/envConstants.js';

//function handler for sending email
const sendEmail=async(email,subject,text)=>{
    const transport=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:variables.userMail,
            pass:variables.userPass,
        },
        logger:true,
        debug:true,
    });
    await transport.sendMail({
        from:variables.userMail,
        to:email,
        subject:subject,
        text:text,
    });
}

//export the functions or class for using functionality globally
export default sendEmail;