// Twilio wrapper placeholder
 const twilioSid = process.env.TWILIO_SID;
 const twilioToken = process.env.TWILIO_TOKEN;
 let client = null;
 if (twilioSid && twilioToken) {
 const twilio = require('twilio');
 client = twilio(twilioSid, twilioToken);
 }
 exports.sendSMS = async ({ to, body }) => {
 if (!client) {
 console.log('Twilio not configured. Skipping SMS to', to);
 return true;
 }
 const message = await client.messages.create({ body, from:
 process.env.TWILIO_FROM, to });
 return message;
 };