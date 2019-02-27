import Axios from "axios";

export const CALL_API = Symbol('CALL_API')

function getAction(type,action,state,data){
    if(typeof type === 'object'){
        return {
            type:type.type,
            payload:type.payload(action,state,data)
        }
    }
    return data ? {
        type,
        payload: data
    } : {
        type
    }
}

export default store => next => action => {
    if(typeof action[CALL_API] !== 'object') return next(action)

    const {endpoint,method ='get',body,types} = action[CALL_API]
    const [request,success] = types
    const state = store.getState()
    next(getAction(request,action,state))
    Axios[method](`${endpoint}?perPage=100`,body).then( ({data}) => next(getAction(success,action,state,data)))
    .catch( err => {
     console.error(err)
    })
}