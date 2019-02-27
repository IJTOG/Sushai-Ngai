import { saveState} from '../lib'

const storage = store => dispatch => action => {
    const result = dispatch(action)
    saveState(store.getState())
    return result
}

export default storage