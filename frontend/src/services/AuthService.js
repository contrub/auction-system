import api from "./api"

const login = (params) => {
    return api.create('/auth/login', params)
}

const signup = (params) => {
    return api.create('/auth/signup', params)
}

const AuthService = {
    login: login,
    signup: signup
}

export default AuthService