const gcm = require('node-gcm');

/* To test notifications, android app is required. I could test if it connects to FCM or not.
If fcm_server_key is valid, it will process further, otherwise will throw error 401
*/

export function sendAndroid(devices: any[], message: string){
    let sender = new gcm.Sender(process.env.FCM_SERVER_KEY);
    let gcmMessage = new gcm.Message();
    gcmMessage.addNotification("title", "You have received push notification!");
    gcmMessage.addNotification("body", message);

    let status: boolean = false;
    sender.send(gcmMessage, {registrationTokens: devices}, function(err: any, response: any){
        if(err)
            status = false;
        else
            status = true;
    })
    return status;
}
