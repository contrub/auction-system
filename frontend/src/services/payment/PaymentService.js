import api from "../api"

const determinePayment = (params) => {
    return api.create(`/api/payments`, params)
}

const PaymentService = {
    determinePayment: determinePayment,
}

export default PaymentService