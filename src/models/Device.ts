import { Notification_Setting } from "./Notification_Setting";

export class Device {
    public user_id!: number;
    public device_token!: string;
    public platform: Platform;
    public created_at: Date;
    public updated_at: Date;

    constructor(device_token: string, user_id: number, platform: Platform){
        if(device_token && user_id && platform){
            this.device_token = device_token;
            this.user_id = user_id;
            this.platform = platform == Platform.Android ? Platform.Android : Platform.Apple;
            this.created_at = new Date();
            this.updated_at = new Date();
        }
        else
            throw new Error("Device token or/and User ID is missing!")
    }
    static findByUserId(user_id: number){
        return devices.find(device => device.user_id == user_id);
    }
    static findAllSubscribedAndroidDevices(): Promise<string[]>{
        let subscribed_users = Notification_Setting.findAllSubscribedUsers();
        let android_devices = devices.filter(device => device.platform == Platform.Android);
        android_devices = android_devices.filter(dev => subscribed_users.find(user => user == dev.user_id));        
        return new Promise((resolve, reject) => {
            let android_tokens: string[] = android_devices.map(dev => dev.device_token);
            resolve(android_tokens);
        })
    }
    static findAllSubscribedAppleDevices(): Promise<string[]>{
        let subscribed_users = Notification_Setting.findAllSubscribedUsers();
        let apple_devices = devices.filter(device => device.platform == Platform.Apple);
        apple_devices = apple_devices.filter(dev => subscribed_users.find(user => user == dev.user_id));        
        return new Promise((resolve, reject) => {
            let android_tokens: string[] = apple_devices.map(dev => dev.device_token);
            resolve(android_tokens);
        })
    }
    static findAllSubscribedDevices(): Promise<DeviceI[]>{
        let subscribed_users = Notification_Setting.findAllSubscribedUsers();
        let filtered_devices = devices.filter(dev => subscribed_users.find(user => user == dev.user_id));
        console.log('devices: ', filtered_devices);
        return new Promise((resolve, reject) => {
            resolve(filtered_devices);
        })
    }
}

export enum Platform{
    Android = "Android",
    Apple = "Apple"
}
export interface DeviceI{
    id: number
    user_id: number;
    device_token: string;
    platform: Platform;
    
    createdAt?: Date
    updatedAt?: Date
}
// Sample Data
let devices: DeviceI[] = [
    {
        id: 1,
        user_id: 1,
        device_token: 'abcdefghijkl',
        platform: Platform.Android
    },
    {
        id: 2,
        user_id: 2,
        device_token: 'cdefghijklmn',
        platform: Platform.Android
    },
    {
        id: 3,
        user_id: 3,
        device_token: 'efghijklmnop',
        platform: Platform.Android
    },
    {
        id: 4,
        user_id: 4,
        device_token: 'aabbccddeeff',
        platform: Platform.Apple
    },
    {
        id: 5,
        user_id: 5,
        device_token: 'bbccdeeffgg',
        platform: Platform.Apple
    },
    {
        id: 6,
        user_id: 6,
        device_token: 'ccdeeffgghh',
        platform: Platform.Apple
    }
]