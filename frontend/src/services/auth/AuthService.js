import api from "../api"

const login = (params) => {
    return api.create('/auth/login', params)
}

const signup = (params) => {
    return api.create('/auth/signup', params)
}

const logout = (params) => {
    return api.create('/auth/logout', params)
}

const getRole = (params) => {
    return api.get('/auth/role', params)
}

const AuthService = {
    login: login,
    signup: signup,
    logout: logout,
    getRole: getRole
}

export default AuthService