
export class Notification_Setting{
    public user_id!: number;
    public channel!: Channel;
    public opt_in: boolean;
    public created_at: Date;
    public updated_at: Date;

    constructor(user_id: number, channel: Channel){
        if(user_id)
            this.user_id = user_id
        else
            throw new Error("User ID is missing!")
        if(channel)
            this.channel = channel
        else
            throw new Error("Channel is missing!")
        
        this.opt_in = channel == "SMS" ? true : false;    // When a user is added, he will be automatically subscribed to SMS service
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    static findAllSubscribedUsers(): number[]{
        return settings.filter(setting => setting.opt_in).map(set => set.user_id);
    }
}

export enum Channel{
    SMS = "SMS",
    PUSH_NOTIFICATION = "PUSH_NOTIFICATION",
}
export interface Notification_SettingI {
    id: number,
    user_id: number,
    opt_in: boolean
}
export let settings: Notification_SettingI[] = [
    {
        id: 1,
        user_id: 1,
        opt_in: true
    },
    {
        id: 2,
        user_id: 2,
        opt_in: false
    },
    {
        id: 3,
        user_id: 3,
        opt_in: true
    },
    {
        id: 4,
        user_id: 4,
        opt_in: false
    },
    {
        id: 5,
        user_id: 5,
        opt_in: true
    },
    {
        id: 6,
        user_id: 6,
        opt_in: true
    }
]