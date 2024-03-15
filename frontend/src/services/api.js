const _apiHost = process.env.REACT_APP_API_HOST;

async function request(url, params, method = "GET") {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    }

    if (params) {
        if (method === "GET") {
            url += "?" + objectToQueryString(params)
        } else {
            options.body = JSON.stringify(params)
        }
    }

    const response = await fetch(_apiHost + url, options)

    return new Promise((resolve, reject) => {
        if (response.ok) {
            if (response.status !== 204) {
                resolve(response.json())
            } else {
                resolve()
            }
        } else {
            response.text()
                .then((errorMessage) => {
                    reject(new Error(errorMessage))
                })
        }
    })
}

function objectToQueryString(obj) {
    return Object.keys(obj)
        .map(key => key + "=" + obj[key])
        .join("&")
}

function get(url, params) {
    return request(url, params)
}


function create(url, params) {
    return request(url, params, "POST")
}


function update(url, params) {
    return request(url, params, "PUT")
}


function remove(url, params) {
    return request(url, params, "DELETE")
}

const api = {
    get: get,
    create: create,
    update: update,
    remove: remove
}

export default api
