import api from "../api"

const fetchLots = () => {
    return api.get("/api/lots")
}

const getLot = (params) => {
    return api.get(`/api/lots/${params.id}`)
}

const createLot = (params) => {
    return api.create(`/api/lots`, params)
}

const updateLot = (params) => {
    return api.update(`/api/lots/${params.id}`, params)
}

const deleteLot = (params) => {
    return api.remove(`/api/lots/${params.id}`)
}

const LotService = {
    fetchLots: fetchLots,
    getLot: getLot,
    createLot: createLot,
    updateLot: updateLot,
    deleteLot: deleteLot
}

export default LotService