/*
Assumptions:
A system is very powerful that can handle heavy traffic. No need to scale the system horizontally.
Sending notification to Pakistan registered numbers.
Ignoring Template for push notification. Considering a simple message

Database:
1. A user can have multiple devices

user                                device
user_id: int                        id: int
email: nvarchar(255)                device_token: nvarchar(255)
phone_number: nvarchar(10)          user_id: int
created_at: Date                    created_at: Date
updated_at: Date                    updated_at: Date

notification_setting
user_id: int
channel: nvarchar(255)  // push notification or SMS
opt_in: boolean
created_at: Date
updated_at: Date
*/

/* Discussion
* For iOS, server sends the push notification to APN and for Android, server sends to FCM. 
APN/FCM further pushes the notification to device.
* For SMS, nexmo will be used as it's SMS service charges are comparatively less.
Compared with Twilio. Both support Pakistan carriers
we get key and secret from nexmo after creating an account
Express-Validator can be used for validation checks, but for this task, excluding it.
*/

import express from "express";
import dotenv from "dotenv";
// import http from "http";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req, res) => res.send("Push Notification System"))
app.use('/', require('./api-routes/index'));

app.listen(port, () => console.log(`Server started on port ${port}`));
module.exports = app;