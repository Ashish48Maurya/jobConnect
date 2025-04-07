const nodemailer = require('nodemailer');
const getEmailHtml = (name, role) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Application Update</title>
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
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Thank you for applying, ${name}</h2>
      <p>
        We appreciate your interest in the <strong>${role}</strong> position at our company.
      </p>
      <p>
        After careful consideration, we regret to inform you that you were not selected for the role at this time.
      </p>
      <p>
        We encourage you to apply for future openings that match your skills and experience. Thank you once again for taking the time to apply.
      </p>
      <p style="margin-top: 30px;">Wishing you the best,<br />The Hiring Team</p>
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

const sendRejectionEmail = async (email, name, role) => {
    const mailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: 'Application Rejected',
        html: getEmailHtml(name, role),
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Rejection email sent successfully!');
    } catch (error) {
        console.error('Error sending rejection email:', error);
    }
}
module.exports = sendRejectionEmail;
