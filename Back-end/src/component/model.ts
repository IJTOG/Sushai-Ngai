import "reflect-metadata";
import {createConnection,getRepository} from "typeorm";
import * as Repository from "../entity";
import {getConnection} from "typeorm";
import Finder from './finder'
import Pagination from './pagination'

const connect = createConnection()
const Model = {
    ...Finder,
    ...Pagination,
     findByUsername(username){
        return  new Promise(async (resolve,reject) => {
            
                const RepositoryResult = getConnection().getRepository(this.collection())
                const found =  await RepositoryResult.find({
                    where:{
                        username
                    }
                })

                if(found.length !== 0){
                    return resolve(found)
                }
                else {
                   return reject()
                }
                
            })
       
    },
    async create(attrs){
     return new Promise(async (resolve,reject) => {
                await getConnection()
                .createQueryBuilder()
                .insert()
                .into(this.collection())
                .values([{ 
                ...attrs                   
            }])
            .execute()
            .then( ({identifiers}) => resolve(identifiers[0]['id']))
            .catch(err => console.error(err))
            })   
   },
    async update(id, attrs){
        await getConnection()
                .createQueryBuilder()
                .update(this.collection())
                .set({ ...attrs })
                .where("id = :id", { id })
                .execute();
        return attrs
    },
    async destroy(id){
        await getConnection()
                .createQueryBuilder()
                .delete()
                .from(this.collection())
                .where("id = :id", { id })
                .execute();
    },
    collection(){
        return Repository[`${this.key}`]
    }

}

export default Model