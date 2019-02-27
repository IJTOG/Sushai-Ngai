import {
 UPLOAD_GALLERY_REQUEST,
 UPLOAD_GALLERY_SUCCES
} from '../action'

const initState = {
    galleryId:"",
    isUploading:false
}

export default (state=initState,{type,payload}) => {

    switch (type) {
        case UPLOAD_GALLERY_REQUEST:
            return {
                galleryId:"",
                isUploading:true
            }
        case UPLOAD_GALLERY_SUCCES:
            return {
                galleryId : payload['galleryId'],
                isUploading:false
            }
        default:
            return state
    }
}