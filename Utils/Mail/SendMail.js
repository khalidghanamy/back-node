import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();



const transport =nodemailer.createTransport({
   service:process.env.SERVICE,

   auth:{
       user:process.env.MAIL_USER,
       pass:process.env.MAIL_PASSWORD
   }
   ,
   port:465,
   host : 'smtp.gmail.com',
}
);

export const sendMail = async (userMail,link) => {
        try {
    const mailOptions = {
        from: 'khalid.gamal.hamed@gmail.com',
        to:userMail ,
        subject: 'Reset Password',
        html: `<h1>Reset Password </h1>
        <p>Click on the link to reset your password
         link: ${link}
        </p>
        `
    }
    await transport.sendMail(mailOptions);
} catch (error) {
    throw error;
}
}

export default sendMail;

