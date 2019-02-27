import { createStore , applyMiddleware, compose } from 'redux'
import rootReducer from '../redux/reducer'
import logger from 'redux-logger'
import Devtools from '../modules/Devtool'
import {persistState} from 'redux-devtools'
import thunk from 'redux-thunk'
import {api} from '../middleware'
function  getDebugSessionKey() {
    const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/)
    return (matches && matches.length > 0)? matches[1] : null
}

export default function(init){
    const middleware = [api,thunk,logger]
    return createStore(
        rootReducer,
        init,
        compose(
            applyMiddleware(...middleware),
            Devtools.instrument(),
            persistState(getDebugSessionKey)
        )
    )
}