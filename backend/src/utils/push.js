 // Push placeholder — integrate FCM or another provider
 exports.sendPush = async ({ deviceId, title, body }) => {
 console.log('sendPush called', deviceId, title, body);
 return true;
 };