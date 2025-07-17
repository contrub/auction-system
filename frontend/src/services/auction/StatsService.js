import api from "../api"

const fetchCategoryStats = () => {
    return api.get("/api/categories/stats")
}

const fetchBidStats = () => {
    return api.get("/api/bids/stats")
}

const fetchProposalStats = () => {
    return api.get("/api/proposals/stats")
}

const StatsService = {
    fetchCategoryStats: fetchCategoryStats,
    fetchBidStats: fetchBidStats,
    fetchProposalStats: fetchProposalStats
}

export default StatsService