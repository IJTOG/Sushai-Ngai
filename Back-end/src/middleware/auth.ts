import * as jwt from 'jsonwebtoken'
// import config from '../config'
import Users from '../component/users/model'

export default function(req,res,next){
    const authHeader = req.header('Authorization')

    if(!authHeader) return next()
    const accessToken  = authHeader.match(/Bearer (.*)/)[1]

    if(authHeader){
        jwt.verify(accessToken,'sushi',(err,decoded)=>{
        if(err) res.json({ success: false, message: 'Failed to authenticate token.' });
        req.user = decoded.sub
        next()
    })
}
}