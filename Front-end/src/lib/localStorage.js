export function saveState(state) {

    try {
        localStorage.setItem('state',JSON.stringify(state))
    } catch (error) {
        console.log(error)
    }
}

export function loadState(state) {
    try {
        const state = localStorage.getItem('state')
        return state ? JSON.parse(state) : undefined
    } catch (error) {
        return undefined
    }
}