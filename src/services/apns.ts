const apns = require('@parse/node-apn');

const options = {};

/* To test notifications, iOS app is required.
*/
export function sendApple(devices: any[], message: string): boolean {
    return true;

    /* To test it, registered app is required */
    // let connection = new apns.Connection(options);

    // let notification = new apns.Notification();
    // notification.device = new apns.Device(deviceId);
    // notification.alert = message;

    // connection.sendNotification(notification);
}