 // Basic nodemailer wrapper (install nodemailer to use this)
 const nodemailer = require('nodemailer');
 let transporter = null;
 if (process.env.SMTP_HOST) {
 transporter = nodemailer.createTransport({
 host: process.env.SMTP_HOST,
 port: parseInt(process.env.SMTP_PORT || '587'),
 secure: false,
 auth: {
 user: process.env.SMTP_USER,
 pass: process.env.SMTP_PASS,
 },
 });
 }
 exports.sendEmail = async ({ to, subject, text, html }) => {
 if (!transporter) {
 console.log('Mailer not configured. Skipping email:', to, subject);
 return true;
 }
 const info = await transporter.sendMail({ from: process.env.SMTP_USER, to,
 subject, text, html });
 return info;
 };