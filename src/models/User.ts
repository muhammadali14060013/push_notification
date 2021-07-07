// All the classes will be derived from Model if database is involved. Sequelize ORM will be used for DB connection.

import { Notification_Setting } from "./Notification_Setting";

export class User{
    public email: string;
    public phone_number: string;
    public created_at: Date;
    public updated_at: Date;

    constructor(email?: string, phone_number?: string){
        if(email || phone_number){
            this.email = email ? email : '';
            this.phone_number = phone_number ? phone_number : '';
            this.created_at = new Date();
            this.updated_at = new Date();
        }
        else
            throw new Error('Either Email or Phone number is required!')
        
    }
    //when fetching from db, return type will be promise<User>
    static findByPk(id: number){
        return users.find(user => user.id == id)
    }

    static filterUsers(ids: number[]): UserI[]{
        return users.filter(user => ids.find(id => id == user.id));
    }

    static findAllSubscribedPhoneNumbers(): Promise<string[]>{
        let subscribed_users: number[] = Notification_Setting.findAllSubscribedUsers();
        let filtered_users: UserI[] = this.filterUsers(subscribed_users);        
        return new Promise((resolve, reject) => {
            let phone_numbers: string[] = filtered_users.filter(user => user.phone_number).map(u => u.phone_number ? u.phone_number : '');
            resolve(phone_numbers);
        })
    }

}
// Adding user interface for sample data
export interface UserI{
    id: number
    phone_number?: string
    email?: string
    createdAt?: Date
    updatedAt?: Date
}
// Sample Data
let users: UserI[] = [
    {
        id: 1,
        email: "muhammadaliee@hotmail.com",
        phone_number: "00923218133335",
    },
    {
        id: 2,
        phone_number: "00923001234567",
    },
    {
        id: 3,
        email: "muhammadaliee3@hotmail.com",
    },
    {
        id: 4,
        email: "muhammadaliee@hotmail.com",
        phone_number: "00923218133334",
    },
    {
        id: 5,
        phone_number: "00923001234568",
    },
    {
        id: 6,
        email: "muhammadaliee3@hotmail.com",
    }
]