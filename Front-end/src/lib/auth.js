const setToken = (headers) => {
    localStorage.setItem('access-token',headers)
}

const getToken = () => localStorage.getItem('access-token')

const removeToken = () => {
    localStorage.removeItem('access-token')
}

export default {
    setToken,
    getToken,
    removeToken
}