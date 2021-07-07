import express from "express";
import { Device, Platform } from "../models/Device";
import { User } from "../models/User";
import { sendApple } from "../services/apns";
import { sendAndroid } from "../services/gcm";
import { sendSMS } from "../services/sms";

/* this middleware is for authenticating admin */
// import {auth} from "../middleware/auth"

const Router = express.Router();

/* message will be received in request body
/* if length of message > 2 and mobile devices exist, 
then push notification will be sent to all the registered and subscribed devices */

// Router.post('/all-platforms', auth, (req, res) => {  // auth validates mustbeAdmin()
Router.post('/all-platforms', (req, res) => {
    let message: string = req.body.message;
    if(!message){
        res.status(400).send("Message not found!");
        return;
    }
    else if(message.length <= 2){
        res.status(400).send("Length of message is short!");
        return;
    }
    Device.findAllSubscribedDevices().then(devices => {
        let android_tokens: string[] = devices.filter(device => device.platform == Platform.Android).map(dev => dev.device_token);
        let apple_tokens: string[] = devices.filter(device => device.platform == Platform.Apple).map(dev => dev.device_token);
        if(sendApple(apple_tokens, message) && sendAndroid(android_tokens, message))
            res.send("Bulk notification sent successfully!");
        else{
            res.status(401).send("Failed to send bulk notiifcation!");
            return;
        }
    })
})

/* message will be received in request body
/* if length of message > 2 and phone numbers exist, 
then SMS will be sent to all the registered and subscribed customer */

// Router.post('/sms', auth, (req, res) => {    // auth validates mustbeAdmin()
Router.post('/sms', (req, res) => {
    let message: string = req.body.message;
    if(!message){
        res.status(400).send("Message not found!");
        return;
    }
    else if(message.length <= 2){
        res.status(400).send("Length of message is short!");
        return;
    }
    User.findAllSubscribedPhoneNumbers().then(nums => {
        nums.forEach(num => {
            if(num){
                if(!sendSMS(num, message)){
                    res.status(403).send("Unable to send SMS.");
                    return;
                }
            }
        });
        res.send("Successfully sent bulk messages!");
    });
})

/* message will be received in request body
/* if length of message > 2 and android devices exist, 
then push notification will be sent to all the registered and subscribed android devices */

// Router.post('/android', auth, (req, res) => {    // auth validates mustbeAdmin()
Router.post('/android', (req, res) => {
    let message: string = req.body.message;
    if(!message){
        res.status(400).send("Message not found!");
        return;
    }
    else if(message.length <= 2){
        res.status(400).send("Length of message is short!");
        return;
    }
    
    Device.findAllSubscribedAndroidDevices().then(devices => {
        console.log(devices);
        
        if(sendAndroid(devices, message))
            res.send("Bulk notification to Android sent successfully!");
        else
            res.status(401).send("Failed to send bulk notification!");
    })
})

/* message will be received in request body
/* if length of message > 2 and apple devices exist, 
then push notification will be sent to all the registered and subscribed apple devices */

// Router.post('/apple', auth, (req, res) => {    // auth validates mustbeAdmin()
Router.post('/apple', (req, res) => {
    let message: string = req.body.message;
    if(!message){
        res.status(400).send("Message not found!");
        return;
    }
    else if(message.length <= 2){
        res.status(400).send("Length of message is short!");
        return;
    }

    Device.findAllSubscribedAppleDevices().then(devices => {
        console.log(devices);
        if(sendApple(devices, message))
            res.send("Bulk notification to Apple devices sent successfully!");
        else
            res.status(401).send("Failed to send bulk notification!");
    })
})

module.exports = Router