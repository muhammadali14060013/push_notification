import Nexmo from "nexmo";

// This service can't be tested without generating API key and secret. It costs charges as well.

const nexmo = new Nexmo({
    apiKey: process.env.API_KEY ? process.env.API_KEY : '',
    apiSecret: process.env.API_SECRET ? process.env.API_SECRET : ''
});

export function sendSMS(recipient: string, messageContent: string): boolean{
    let sender = process.env.YOUR_VIRTUAL_NUMBER ?? "Your Virtual Number";
    let status: boolean = true;
    // nexmo.message.sendSms(
    //     sender, recipient, messageContent,
    //     {type: 'unicode'},
    //     (err, data) => {        
    //         if(err)
    //             status = false
    //         else
    //             status = true
    //     }
    // )
    return status;
}