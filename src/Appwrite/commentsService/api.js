import { Client, TablesDB, ID, Query } from "appwrite";
import config from "@/config/config";


// Service class responsible for all CRUD operations related to comments
export class CommentsService {
    client = new Client()
    tablesDB;

    constructor() {
        // Initialize Appwrite client
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        // Initialize TablesDB instance
        this.tablesDB = new TablesDB(this.client)
    }

    // Create a new comment for a specific post
    async createComment({postid, userid, username, content}) {
        try {
            return await this.tablesDB.createRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCommentsTableId,
                rowId: ID.unique(),
                data: {
                    postid,
                    userid,
                    username,
                    content
                }
            })
        }
        catch (error) {
            return false
        }
    }

    
     // Fetch all comments for a given post
    async getCommentByPost(postid) {
        try {
            const result = await this.tablesDB.listRows({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCommentsTableId,
                queries: [
                    Query.equal("postid", postid),
                ]
            })
            return result.rows

        }
        catch (error) {
            return false

        }
    }


    // Update an existing comment's content
    async updateComment(commentid, newContent) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCommentsTableId,
                rowId: commentid,
                data: {
                    content: newContent
                }


            })
        }
        catch (error) {
            return false
        }
    }


    // Delete a comment by ID
    async deleteComment(commentid) {
        try {
            return await this.tablesDB.deleteRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCommentsTableId,
                rowId: commentid
            })

        }
        catch (error) {
            return false
        }
    }

}

const commentsService = new CommentsService();
export default commentsService