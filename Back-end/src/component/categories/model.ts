import "reflect-metadata";
import Model from '../model'
import * as cloudinary from 'cloudinary'

const Categories = {
    ...Model,
    key:'Category',
    relations:['gallery_id'],
    uploadPic(uri){
        return new Promise((resolve,reject)=>{
            cloudinary.config({ 
                cloud_name: 'dua9p7o7k', 
                api_key: '213825381455339', 
                api_secret: '48kTGxfznMYqLzZJaXTU2BPOyU4' 
              });
              cloudinary.v2.uploader.upload(`${uri}`, (err,{url})=> {
                 resolve({url})
              })
        })
        
        
    }
}

export default Categories