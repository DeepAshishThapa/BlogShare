import { Client, TablesDB, ID, Storage, Query } from "appwrite";
import config from "../../config/config";

/**
 * PostService
 * ---------------------------------------------------------------
 * Handles all Appwrite operations related to:
 *  - Creating posts
 *  - Updating posts
 *  - Fetching single/multiple posts
 *  - Filtering posts by tag
 *  - Uploading / deleting images from storage
 * 
 * This class abstracts all backend interactions in one place,
 * keeping your React components clean and easy to maintain.
 */

export class PostService {
    client = new Client()
    tablesDB;
    storage;


    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.tablesDB = new TablesDB(this.client)
        this.storage = new Storage(this.client)

    }

    /**
    * Create a new post in Appwrite
    * rowId = slug (unique identifier)
    */
    async CreatePost({ slug, title, content, featuredImage, status, userId, tags }) {
        try {
            return await this.tablesDB.createRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    Tags: tags,
                    userid: userId

                }

            })
        }
        catch (error) {
            throw error
        }
    }


    /**
     * Update an existing post by slug (rowId)
     */
    async UpdatePost({ slug, title, content, featuredImage, status, tags }) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    Tags: tags

                }
            })
        }
        catch (error) {
            throw error
        }
    }


    /**
    * Delete a post from database using slug
    */
    async deletepost(slug) {
        try {
            const response = await this.tablesDB.deleteRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: slug

            })
            return true
        }
        catch (error) {
            console.log("arrwrite error", error)
            return false

        }
    }



    /**
      * Fetch a single post by slug
      */
    async getpost(slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: slug,


            })
        }
        catch (error) {
            console.log("Appwrite error", error)
            return false
        }

    }


    /**
   * Fetch all active posts
   */
    async getposts() {
        try {
            return await this.tablesDB.listRows({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                queries: [
                    Query.equal("status", "active")
                ]

            })
        }
        catch (error) {
            console.log("Appwrite error", error)
        }
    }



    /**
    * Fetch posts by a single tag
    * Tags is an ARRAY in DB → Query.equal("Tags", tagString)
    * returns posts whose Tags array CONTAINS that tag
    */
    async gettagsposts(tags) {
        try {
            return await this.tablesDB.listRows({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                queries: [
                    Query.equal('Tags', tags)
                ]
            })


        }
        catch (error) {
            return false

        }
    }



    /**
     * Upload a file (featuredImage) to Appwrite Storage
     */
    async uploadfile(file) {
        try {
            return await this.storage.createFile({
                bucketId: config.appwriteBucketId,
                fileId: ID.unique(),
                file,

            })
        }
        catch (error) {
            console.log("Appwrite error", error)
            return false
        }
    }



    /**
    * Delete a file from Storage by fileId
    */
    async deletefile(fileId) {
        try {
            const result = await this.storage.deleteFile({
                bucketId: config.appwriteBucketId,
                fileId


            })
            return true
        }
        catch (error) {
            console.log("Appwrite error", error)
        }
    }
    


    /**
     * Get public view link for an uploaded file
     */
    async getfilepreview(fileId) {

        const u = await this.storage.getFileView({
            bucketId: config.appwriteBucketId,
            fileId,
        });
        // normalize to plain string
        return typeof u === "string" ? u : u?.href || u?.toString() || "";


    }
}


const postService = new PostService();
export default postService