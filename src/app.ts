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

notification_log
id: int
sender: nvarchar(255)
receiver: nvarchar(MAX)
channel: nvarchar(255)
content: nvarchar(MAX)
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
app.use(express.json())

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
// app.get('/', (req, res) => {
//     console.log(req.body.message);
//     res.send('hl')
// })
// app.post('/', (req, res) => {
//     console.log(req.body.message);
//     console.log(req.query.id);
//     res.send('hl')
// })
app.use('/', require('./api-routes/index'));

// const httpServer = http.createServer(app);
// httpServer.listen(port, () => {
//   console.log(
//     `🚀 Server ready at http://localhost:${port}`
//   );
// }).setTimeout(3000);

