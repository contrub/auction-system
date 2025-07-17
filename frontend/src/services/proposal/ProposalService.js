import api from "../api"

const fetchProposals = () => {
    return api.get("/api/proposals")
}

const fetchLotProposals = (params) => {
    return api.get(`/api/lots/${params.id}/proposals`)
}

const getProposal = (params) => {
    return api.get(`/api/proposals/${params.id}`)
}

const createProposal = (params) => {
    return api.create(`/api/proposals`, params)
}

const updateProposal = (params) => {
    return api.update(`/api/proposals/${params.id}`, params)
}

const deleteProposal = (params) => {
    return api.remove(`/api/proposals/${params.id}`)
}

const ProposalService = {
    fetchProposals: fetchProposals,
    fetchLotProposals: fetchLotProposals,
    getProposal: getProposal,
    createProposal: createProposal,
    updateProposal: updateProposal,
    deleteProposal: deleteProposal
}

export default ProposalService