import { Channel } from "./Notification_Setting";

export class Notification_Log{
    public sender: string;
    public receiver: string;
    public channel: Channel | string;
    public content!: string;
    public created_at: Date;
    public updated_at: Date;

    constructor(content: string, sender?: string, receiver?: string, channel?: Channel | string){
        if(content){
            this.content = content;
            this.sender = sender ?? '';
            this.receiver = receiver ?? '';
            this.channel = channel ?? '';
            this.created_at = new Date();
            this.updated_at = new Date();
        }
        else
            throw new Error('Content is missing!')
    }
}