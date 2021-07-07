/**************** Assumptions:
* A system is very powerful that can handle heavy traffic. So ignoring scaling factor.
* Sending SMS to only Pakistan registered numbers.
* Ignoring Template for push notification. Considering a simple text message
* Ignoring middlewares for validation and authentications, otherwise, I would have added super_user table in db as well

Database (If implemented):
1. A user can have multiple devices

user                                device
user_id: int                        id: int
email: nvarchar(255)                device_token: nvarchar(255)
phone_number: nvarchar(11)          user_id: int
created_at: Date                    platform: nvarchar(8)
updated_at: Date                    updated_at: Date
                                    created_at: Date

notification_setting
user_id: int
opt_in: boolean
created_at: Date
updated_at: Date

****************/

/**************** Discussion
* For iOS, server sends the push notification to Apple Push Notification and for Android, server sends to Firebase Cloud Messaging. 
* For SMS, nexmo will be used as it's SMS service charges as compared to twilio are less.
Although both support Pakistan carriers. We get key and secret from nexmo after creating an account.
* Express-Validator can be used for validation checks, but for this task, I have excluded it.
* Although I have added validation checks in APIs.
* Details of APIs is mentioned with the APIs as comment.
* I was waiting for the response from your side. While waiting I wrote the models, but due to no reply from your side, I left them as it is.
And added sample data for testing purpose. For testing purpose on Docker, I have kept the sample data
****************/

import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Push Notification System")
})

app.use('/', require('./api-routes/index'));

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;