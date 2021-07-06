// All the classes will be derived from Model if database is involved. Sequelize ORM will be used for DB connection

export class User{
    public email: string;
    public phone_number: string;
    public created_at: Date;
    public updated_at: Date;
    // public static findByPk: (id: number) => Promise<UserI> //definition only - not overriding

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
    static findByPk(id: number): Promise<any>{
        return new Promise((resolve, reject) => {
            let user = users.find(user => user.id == id)

            if(user)
                resolve(user)
            else
                reject(null)
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
    }
]