import api from "../api"

const fetchCategories = () => {
    return api.get("/api/categories")
}

const getCategory = (params) => {
    return api.get(`/api/categories/${params.id}`)
}

const createCategory = (params) => {
    return api.create(`/api/categories`, params)
}

const updateCategory = (params) => {
    return api.update(`/api/categories/${params.id}`, params)
}

const deleteCategory = (params) => {
    return api.remove(`/api/categories/${params.id}`)
}

const CategoryService = {
    fetchCategories: fetchCategories,
    getCategory: getCategory,
    createCategory: createCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
}

export default CategoryService