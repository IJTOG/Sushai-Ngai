import "reflect-metadata";
import Model from '../model'
import {getConnection} from "typeorm"
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as vision from '@google-cloud/vision'
import * as download from 'image-downloader'
import * as cloudinary  from 'cloudinary'


const User = {
        ...Model,
        key: 'User',
        relations:["gallery_id","bill_id"],
         create(attrs){
          return new Promise((resolve, reject)=>{
                const {password} = attrs
                 bcrypt.hash(password, 12,async (err, hash)=>{
                        if(err) return reject(err)
                            await getConnection()
                                    .createQueryBuilder()
                                    .insert()
                                    .into(this.collection())
                                    .values([{ 
                                                ...attrs,
                                                password:hash,
                                                is_admin:false
                                        }])
                                    .execute();
                        return resolve(attrs)
                   })
                })
             },
             genToken(user){
                  return jwt.sign({sub:user},'sushi',{expiresIn: '1h'})
             },
             verify(user,password){
                return new Promise((resolve,reject)=>{
                        const hash = user.password
                        bcrypt.compare(password,hash,(err,isValid)=>{
                                if(err) return reject(err)
                                return resolve(isValid)
                        })
                })
             },
            async ocr(IdCard){
                let sex,firstNameTh,lastNameTh,address,firstNameEn,lastNameEn,birthdate,idcard 
                const client = new vision.ImageAnnotatorClient();
              await client
                .documentTextDetection(`C:/Development/Workroom/SoftwareEngineering/Backend/src/asset/idcard/${IdCard}.jpg`)
                    .then(async res => {
                        let content = res[0].fullTextAnnotation.text
                        let token = content.match(/\S+/g)
                        token.map((data,index)=>{
                            if(data.includes('Card')){
                              if(isNaN(token[index+5]))
                              idcard = token[index+2]+token[index+3]+token[index+4]+token[index+5]+token[index+6]
                              idcard = token[index+2]+token[index+3]+token[index+4]+token[index+5]
                            }
                            if(data.includes('ชื่อตัวและชื่อสกุล')){
                                firstNameTh = token[index+2]
                                lastNameTh = token[index+3]
                                firstNameEn = token[index+6]
                                lastNameEn = token[index+9]
                            }
                            if(data.includes('ที่อยู่')){
                                address = token[index+1]+token[index+2]+token[index+3]+token[index+4]+token[index+5]
                            }
                            if(data.includes("Birth")){
                                birthdate = `${token[index+1]} ${token[index+2]} ${token[index+3]}`
                             }
                            if(data.includes("Mr.")) 
                              sex = "ชาย"
                            if(data.includes('Miss'))
                              sex= "หญิง"
                        })
                
             })
             return {
                sex,firstNameTh,lastNameTh,address,firstNameEn,lastNameEn,birthdate   
        }
        },
            async downloadIdCard(filenamepic,url){
                const options = {
                 url,
                 dest: `./src/asset/idcard/${filenamepic}.jpg`      
               }
               let name;
              await download.image(options)
                 .then(({ filename, image }) => {
                   console.log('File saved to', filename)
                   name = filenamepic
                 })
                 .catch((err) => {
                   console.error(err)
                 })
             return this.ocr(name)
             },
             uploadImage(uri){
                return new Promise((resolve,reject)=>{
                         cloudinary.config({ 
                                cloud_name: 'dua9p7o7k', 
                                api_key: '213825381455339', 
                                api_secret: '48kTGxfznMYqLzZJaXTU2BPOyU4' 
                              });
                              cloudinary.v2.uploader.upload(`${uri}`, (err,{signature,url})=> {
                             this.downloadIdCard(signature,url).then(data =>{
                                resolve(data)
                             }).catch( err => {
                                     console.log(err)
                                     reject("ERROR")
                                })
                              })
                             
                })
               
                    
             }
             
        
}

export default User