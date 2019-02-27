import {
    getConnection,
    createConnection,
    getRepository
} from "typeorm";

const Finder = {
    async where(conditions){
        return new Promise((resolve,reject)=>{
            this.findAll().then(async collection =>{
                resolve(Object 
                  .keys(conditions)
                  .reduce((results,key)=>{
                        results.filter(item => item[key] == conditions[key])
                  },collection))
            }).catch(err => {
                reject(err)
            })
        })
     },
     async findAll() {
         const loadRepository = await getConnection()
                                        .getRepository(this.collection())
                                        .find({relations:this.relations})
          return new Promise((resolve,reject)=>{
                    if(loadRepository === undefined) reject({err:"not found"})
                     resolve(loadRepository)
          })
   },
   async findById(id){
    const loadRepository = await  getConnection()
                                    .getRepository(this.collection())
                                    .findOne(id, { relations:this.relations });
    return new Promise((resolve,reject)=>{
            if(loadRepository === undefined) reject({err:"not found"})
            resolve(loadRepository)
    })
  },
  
}

export default Finder