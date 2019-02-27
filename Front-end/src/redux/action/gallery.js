import {
 UPLOAD_GALLERY_REQUEST,
 UPLOAD_GALLERY_SUCCES
} from './'
import {CALL_API} from '../../middleware'
import Axios from 'axios';
import constants from '../../constants';

export async function upToCloud(uri){
    const res = await  Axios.post(`${constants.API}/categories/upload`,{uri})
    const {data:{url}} = res
    console.log(url)
    return url
}
export function uploadGallery(url,name){
          return {
                [CALL_API]:{
                    endpoint:`${constants.API}/galleries/create`,
                    body:{
                        location_pic:url,
                         alt_name:name
                    },
                    method:'post',
                    types:[UPLOAD_GALLERY_REQUEST,{
                        type:UPLOAD_GALLERY_SUCCES,
                        payload(action,state,data){
                            return{
                                galleryId:data['gallery']['id']
                            }
                        }
                    }]
                }
            }
}


