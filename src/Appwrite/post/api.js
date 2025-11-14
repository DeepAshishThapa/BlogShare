import { Client, TablesDB, ID, Storage, Query } from "appwrite";
import config from "../../config/config";

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

    async CreatePost({ slug, title, content, featuredImage, status, userId,tags }) {
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
                    Tags:tags,
                    userid: userId

                }




            })
        }
        catch (error) {
            throw error
        }
    }
    async UpdatePost({ slug, title, content, featuredImage, status,tags }) {
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
                    Tags:tags


                }




            })
        }
        catch (error) {
            throw error
        }
    }

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