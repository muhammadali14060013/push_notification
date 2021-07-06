import express from "express";
import Nexmo from "nexmo";
import { Channel } from "../models/Notification_Setting";

const Router = express.Router();
Router.get('/', (req, res) => {
    res.send("hello")
})

// Router.post('/', (req, res) =>
//     {
//         let message = req.params.message;
//         let channel: Channel = req.params.channel;
        
//         nexmo.message.sendSms(
//             'your_set_number', 'receiver', 'message', 
//             {type: 'unicode'},
//             (err, data)=>{
//                 if(err)
//                     console.log(err.status, err.error_text);
//                 else if(data)
//                     console.log(data.messages);
//             }
//         )
//         res.status(201).json({
//             message: `Notification via ${channel} is sent successfully`
//         }).send("Hello get")
//     }
// )

const nexmo = new Nexmo({
    apiKey: process.env.API_KEY ? process.env.API_KEY : '',
    apiSecret: process.env.API_SECRET ? process.env.API_SECRET : ''
});

module.exports = Router