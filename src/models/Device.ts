
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
    static findAllAndroidDevices(): Promise<string[]>{
        return new Promise((resolve, reject) => {
            let android_tokens: string[] = devices.filter(device => device.platform == Platform.Android).map(dev => dev.device_token);
            resolve(android_tokens);
        })
    }
    static findAllAppleDevices(): Promise<string[]>{
        return new Promise((resolve, reject) => {
            let apple_tokens: string[] = devices.filter(device => device.platform == Platform.Apple).map(dev => dev.device_token);
            resolve(apple_tokens);
        })
    }
    static findAllDevices(): Promise<DeviceI[]>{
        return new Promise((resolve, reject) => {
            resolve(devices);
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
        platform: Platform.Apple
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
        user_id: 7,
        device_token: 'ccdeeffgghh',
        platform: Platform.Apple
    }
]