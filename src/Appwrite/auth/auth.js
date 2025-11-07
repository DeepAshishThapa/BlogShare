import { Client, Account, ID } from "appwrite";
import config from "../../config/config";


/**
 * AuthService
 * ----------------------------
 * A simple wrapper class for Appwrite Authentication APIs.
 * Handles user account creation, login, session management, and logout.
 */
export class AuthService {
    client = new Client()   // Appwrite client instance
    account;                 // Account service instance

    constructor() {

        // Initialize the Appwrite Client and connect to project
        this.client
            .setEndpoint(config.appwriteUrl)        //  Appwrite endpoint URL
            .setProject(config.appwriteProjectId)   // Your Appwrite project ID

        this.account = new Account(this.client)
    }




    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name

            })
            // If account successfully created, log user in immediately
            if (userAccount) {
                return this.login({ email, password })
            }
        }
        catch (error) {
            throw error    // Propagate error to be handled by the caller
        }


    }



    /**
    * Log in using email & password credentials.
    * Returns the active session.
    */
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession({ email, password })


        }
        catch (error) {
            throw error
        }
    }




    /**
    * Get currently logged-in user (if session exists).
    * Returns user object or null if no session / token invalid.
    */
    async getAccount() {
        try {
            return await this.account.get()

        }
        catch (error) {
            return null
        }

    }



    
    /**
     * Log out current user by deleting the active session.
     */
    async logout() {
        try {
            return await this.account.deleteSession({
                sessionId: 'current'
            })

        }
        catch (error) {
            throw error
        }
    }

}

const authService = new AuthService();

export default authService





