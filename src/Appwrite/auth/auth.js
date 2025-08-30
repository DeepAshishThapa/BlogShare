import { Client, Account, ID } from "appwrite";
import config from "../../config/config";

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.account = new Account(this.client)



    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount= await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name

            })
            if (userAccount){
                return this.login({email,password})
            }
        }
        catch (error) {
            throw error
        }


    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession({email,password})

            
        }
        catch(error){
            throw error
        }
    }

    async getAccount(){
        try{
            return await this.account.get()

        }
        catch(error){
            console.log("Appwrite service :: getcurrentUser error",error)
        }
        return null; 
    }
    
    async logout(){
        try{
            return await this.account.deleteSession({
                sessionId:'current'
            })

        }
        catch(error){
            throw error
        }
    }

}

const authService=new AuthService();

export default authService


 


