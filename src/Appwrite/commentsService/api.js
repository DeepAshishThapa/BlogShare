import { Client, TablesDB, ID, Query } from "appwrite";
import config from "@/config/config";



export class commentsService {
    client = new Client()
    tablesDB;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.tablesDB = new TablesDB(this.client)


    }

    async createComment(postid, userid, username, content) {
        try {
            return await tablesDB.createRow({
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




}
