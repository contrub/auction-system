import api from "./api"

const fetchFinancialStats = () => {
    return api.get("/api/financial-activity")
}

const StatsService = {
    fetchFinancialStats: fetchFinancialStats
}

export default StatsService