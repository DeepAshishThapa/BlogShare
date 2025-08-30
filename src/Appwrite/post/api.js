import { Client, TablesDB } from "appwrite";
import config from "../../config/config";

export class PostService{
    client = new Client()
    tablesDB;
    
    constructor(){
        this.client
          .setEndpoint(config.appwriteUrl)
          .setProject(config.appwriteProjectId)

        this.tablesDB=new TablesDB(this.client)

    }

    async CreatePost({slug,title,content,featuredImage,status,userId}){
        try{
            return await this.tablesDB.createRow({
                databaseId:config.appwriteDatabaseId,
                tableId:config.appwriteTableId,
                rowId:slug,
                data:{
                    title,
                    content,
                    featuredImage,
                    status,
                    userId

                }


                

            })
        }
        catch(error){
            throw error
        }
    }
}