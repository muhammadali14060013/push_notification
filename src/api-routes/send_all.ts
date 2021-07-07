import express from "express";
import { Device, Platform } from "../models/Device";
import { User } from "../models/User";
import { sendApple } from "../services/apns";
import { sendAndroid } from "../services/gcm";
import { sendSMS } from "../services/sms";

/* this middleware is for authenticating admin */
// import {auth} from "../middleware/auth"

const Router = express.Router();
/*Commented line is the representation when middleware is added*/
// Router.post('/all-platforms', auth, (req, res) => {
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

// Router.post('/sms', auth, (req, res) => {
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

// Router.post('/android', auth, (req, res) => {
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

// Router.post('/apple', auth, (req, res) => {
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