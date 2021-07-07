import express from "express";
import { Device, Platform } from "../models/Device";
import { User } from "../models/User";
import { sendAndroid } from "../services/gcm";
import { sendApple } from "../services/apns";
import { sendSMS } from "../services/sms";

require('dotenv').config()

const Router = express.Router();

/*  user(customer) id will be passed as url param.
/*  message will be received in request body
/*  if length of message > 2 and phone number of customer exists then SMS will be sent to customer */

// Router.post('/sms/:id', auth2, (req, res) => {    // auth2 validates mustbeAdmin() || mustbeClient()
Router.post('/sms/:id', (req, res) => {
    let id = req.params.id;
    let user = User.findByPk(+id)
    
    if(!user){
        res.status(404).send("User not found is database. Invalid ID!");
        return;
    }
    if(!user?.phone_number){
        res.status(404).send("Phone number is missing!");
        return;
    }
    
    if(!req.body.message){
        res.status(400).send("Message not found!");
        return;
    }
    let message: string = req.body.message;
    if(message.length <= 2){
        res.status(400).send("Length of message is short!");
        return;
    }
    if(!sendSMS(user.phone_number, message)){
        res.status(403).send("Unable to send SMS.");
        return;
    }
    res.send("Successfully sent a message!");
})

/*  user(customer) id will be passed as url param.
/*  message will be received in request body
/*  if length of message > 2, and platform of registered device for given id is android, 
then push notification will be sent to customer */

// Router.post('/android/:id', auth2, (req, res) => {    // auth2 validates mustbeAdmin() || mustbeClient()
Router.post('/android/:id', (req, res) => {
    let id = req.params.id;
    let user = User.findByPk(+id)
    
    if(!user){
        res.status(404).send("User not found is database. Invalid ID!");
        return;
    }

    if(!req.body.message){
        res.status(400).send("Message not found!");
        return;
    }
    let message: string = req.body.message;
    if(message.length <= 2){
        res.status(400).send("Length of message is short!");
        return;
    }

    let device = Device.findByUserId(user.id);
    
    if(device && device.platform == Platform.Android){
        if(sendAndroid([device.device_token], message))
            res.send("Push notification to Android sent successfully!");
        else{
            res.status(401).send("Failed to send push notification!");  return;}
    }
    else
        res.status(401).send("Invalid platform is selected");
})

/*  user(customer) id will be passed as url param.
/*  message will be received in request body
/*  if length of message > 2, and platform of registered device for given id is apple, 
then push notification will be sent to customer */

// Router.post('/apple/:id', auth2, (req, res) => {    // auth2 validates mustbeAdmin() || mustbeClient()
Router.post('/apple/:id', (req, res) => {
    let id = req.params.id;
    let user = User.findByPk(+id)
    
    if(!user){
        res.status(404).send("User not found is database. Invalid ID!");
        return;
    }

    if(!req.body.message){
        res.status(400).send("Message not found!");
        return;
    }
    let message: string = req.body.message;
    if(message.length <= 2){
        res.status(400).send("Length of message is short!");
        return;
    }
    
    let device = Device.findByUserId(user.id);
    
    if(device && device.platform == Platform.Apple){
        if(sendApple([device.device_token], message))
            res.send("Push notification to Apple device is sent successfully!");
        else{
            res.status(401).send("Failed to send push notification!");  return;}
    }
    else
        res.status(401).send("Invalid platform is selected");
})

module.exports = Router