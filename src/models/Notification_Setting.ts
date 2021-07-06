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
}

export enum Channel{
    SMS = "SMS",
    PUSH_NOTIFICATION = "PUSH_NOTIFICATION",
}