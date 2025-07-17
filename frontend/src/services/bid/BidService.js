import api from "../api"

const fetchBids = () => {
    return api.get("/api/bids")
}

const fetchLotBids = (params) => {
    return api.get(`/api/lots/${params.id}/bids`)
}

const getBid = (params) => {
    return api.get(`/api/bids/${params.id}`)
}

const createBid = (params) => {
    return api.create(`/api/bids`, params)
}

const updateBid = (params) => {
    return api.update(`/api/bids/${params.id}`, params)
}

const deleteBid = (params) => {
    return api.remove(`/api/bids/${params.id}`)
}

const BidService = {
    fetchBids: fetchBids,
    fetchLotBids: fetchLotBids,
    getBid: getBid,
    createBid: createBid,
    updateBid: updateBid,
    deleteBid: deleteBid
}

export default BidService