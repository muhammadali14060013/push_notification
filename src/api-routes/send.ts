import express from "express";
import Nexmo from "nexmo";
import { Device, DeviceI, Platform } from "../models/Device";
import { Channel } from "../models/Notification_Setting";
import { User } from "../models/User";
import {} from "../services/gcm"
import { sendAndroid } from "../services/gcm";
import { sendApple } from "../services/apns";

require('dotenv').config()

const Router = express.Router();
Router.get('/', (req, res) => {
    res.send("helloooo")
})
const nexmo = new Nexmo({
    apiKey: process.env.API_KEY ? process.env.API_KEY : '',
    apiSecret: process.env.API_SECRET ? process.env.API_SECRET : ''
});

function sendSMS(sender: string, recipient: string, messageContent: string): Promise<boolean>{
    let status: boolean = true;
    nexmo.message.sendSms(
        sender, recipient, messageContent,
        {type: 'unicode'},
        (err, data) => {        
            if(err)
                status = false
        }
    )
    return new Promise((res, rej) => {if(status) res(status); rej(status)});
}

Router.post('/', async (req, res) =>
    {        
        // extract channel from query parameters
        if(!req.body.channel){
            res.status(400).send("Channel not found!");
            return;
        }
        let channel: any = req.body.channel;
        if(channel == Channel.SMS /*&& isAdmin()*/)
            channel = Channel.SMS
        else if(channel == Channel.PUSH_NOTIFICATION /*&& isAdmin() || isClient*/)
            channel = Channel.PUSH_NOTIFICATION
        else
            res.status(400).send("Channel type is not valid!")
        
        // extract message from query parameters
        let message: string = req.body.message;
        if(!message){
            res.status(400).send("Message not found!");
            return;
        }
        else if(message.length <= 2){
            res.status(400).send("Length of message is short!");
            return;
        }

        // extract ID from query parameters
        if(!req.query.id){
            res.status(400).send("ID not found!");
            return;
        }
        let id = req.query.id;
        let user;
        if(id){
            user = await User.findByPk(+id)
            if(!user){
                res.status(404).send("User not found is database. Invalid ID!"); return;
            }
        }
        // Send Notification to a user via SMS or push notification
        if(user){
            if(channel == Channel.SMS && user.phone_number){
                sendSMS(process.env.PHONE_NUMBER ?? "System Number", user.phone_number, message)
                .then(() => res.send("Successfully sent the SMS."))
                .catch(() => {res.status(403).send("Unable to send SMS.");   return;})
            }
            else if(channel == Channel.PUSH_NOTIFICATION){
                let device: DeviceI = await Device.findByUserId(user.id)
                if(!device){
                    res.status(404).send("No registered device found for this user!");
                    return;
                }
                if(device && device.platform == Platform.Android){
                    if(sendAndroid([device], message))
                        res.send("Sent successfully!");
                    else
                        res.status(401).send("Failed to send notification!");
                }

                else if(device && device.platform == Platform.Apple){
                    sendApple([device], message);
                    res.status(201).send("Sent successfully!");
                }
            }
            else{
                res.status(404).send("Phone number not found");
                return;
            }
        }
    }
)



module.exports = Router