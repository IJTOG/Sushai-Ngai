const Pagination = {
     paginate(conditions, page=1,perPage =5){
         
         
         return new Promise((resolve,reject) => {
            const queryResults =   this.where(conditions).then( async results => {
                resolve( {
                   [this.key]:results.slice((page-1)*perPage,page*perPage),
                       meta: {
                           page:+page,
                           perPage:+perPage,
                           totalPages: Math.ceil(results.length / perPage)
                       }
                })
            })
         })
    }
}

export default Pagination