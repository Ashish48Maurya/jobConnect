require('dotenv').config();
const nodemailer = require('nodemailer');
const getEmailHtml = (name, role, formattedDateTime, meetId, baseURL) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Application Accepted</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        margin: auto;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      .btn {
        display: inline-block;
        background-color: #4caf50;
        color: #ffffff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Congratulations, ${name}!</h2>
      <p>
        We are pleased to inform you that your application for the position of <strong>${role}</strong> has been accepted.
      </p>
      <p>
        Our team was very impressed with your background and experience, and we are excited to move forward with you.
      </p>
      <p>
         <a href="${baseURL}/connect/${meetId}" class="btn">
          Join the Meeting at ${formattedDateTime}
        </a>
      </p>
      <p style="margin-top: 30px;">Best regards,<br />The Hiring Team</p>
    </div>
  </body>
</html>
`;



const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GPASSWORD,
  },
});

const sendAcceptanceEmail = async (email, name, role, scheduledDateTime, meetId,baseURL) => {

  const formattedDateTime = new Date(scheduledDateTime).toLocaleString("en-US", {
    weekday: "long",    
    year: "numeric",    
    month: "long",    
    day: "numeric",     
    hour: "numeric",   
    minute: "2-digit",  
    hour12: true        
  });

  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject: 'Application Accepted',
    html: getEmailHtml(name, role,formattedDateTime, meetId,baseURL),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Acceptance email sent successfully!');
  } catch (error) {
    console.error('Error sending acceptance email:', error);
  }
}
module.exports = sendAcceptanceEmail;