/*
=========
Fido the fetch wrapper
=========
*/

class FidoError extends Error {
    constructor(response, errors) {
        super();
        this.response = response;
    }
} //creates error with response object.

export default {
    baseUrl: "",
    headers: {},
    requestOptions: {},
    get,
    post,
};

function get(url) {
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            ...this.headers,
        },
        ...this.requestOptions,
    };
    return fetch(this.baseUrl + url, options).then((response) => handleResponse(response));
}

function post(url, payload) {
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...this.headers,
        },
        body: JSON.stringify(payload),
        ...this.requestOptions,
    };
    return fetch(this.baseUrl + url, options).then((response) => {
        if (!response.ok) {
            return handleErrorResponse(response);
        }
        return {};
    });
}

async function handleResponse(response) {
    try {
        const data = await handleFidoBody(response);
        return formatedFidoResponseData(response, data);
    } catch (e) {
        throw new FidoError(formatedFidoResponseData(response, { errors: e }));
    }
}

async function handleErrorResponse(response) {
    const error = await handleFidoBody(response);
    if (error.errors) {
        throw new FidoError(formatedFidoResponseData(response, { errors: error.errors }));
    } else {
        throw new FidoError(formatedFidoResponseData(response, { errors: { message: `Fido request failed with status code: ${response.code}` } }));
    }
}

const handleFidoBody = (response) => {
    return response.text().then((text) => {
        return JSON.parse(text);
    });
};

const formatedFidoResponseData = (response, data) => {
    response.data = data;
    return response;
};