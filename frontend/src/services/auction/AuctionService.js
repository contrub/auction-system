import api from "../api"

const fetchAuctions = () => {
    return api.get("/api/auctions")
}

const getAuction = (params) => {
    return api.get(`/api/auctions/${params.id}`)
}

const getAuctionLots = (params) => {
    return api.get(`/api/auctions/${params.id}/lots`)
}

const createAuction = (params) => {
    return api.create(`/api/auctions`, params)
}

const updateAuction = (params) => {
    return api.update(`/api/auctions/${params.id}`, params)
}

const deleteAuction = (params) => {
    return api.remove(`/api/auctions/${params.id}`)
}

const AuctionService = {
    fetchAuctions: fetchAuctions,
    getAuction: getAuction,
    getAuctionLots: getAuctionLots,
    createAuction: createAuction,
    updateAuction: updateAuction,
    deleteAuction: deleteAuction
}

export default AuctionService