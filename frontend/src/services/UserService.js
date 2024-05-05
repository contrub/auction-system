import api from "./api"

const fetchUsers = () => {
    return api.get("/api/users")
}

const getUser = (params) => {
    return api.get(`/api/users/${params.id}`)
}

const createUser = (params) => {
    return api.create(`/api/users/${params.id}`)
}

const updateUser = (params) => {
    return api.update(`/api/users/${params.id}`, params)
}

const deleteUser = (params) => {
    return api.remove(`/api/users/${params.id}`)
}

const UserService = {
    fetchUsers: fetchUsers,
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}

export default UserService