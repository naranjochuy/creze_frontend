import { Api, ApiAuth } from "./Api";

export const serviceLogIn = async(data) => {
    try {
        const API = await Api()
        const resp = await API.post(`login/`, data);
        return resp
    } catch (error) {
        return error.response
    }
}

export const serviceSignUp = async(data) => {
    try {
        const API = await Api()
        const resp = await API.post(`signup/`, data);
        return resp
    } catch (error) {
        return error.response
    }
}

export const serviceMFASetup = async() => {
    try {
        const API = await ApiAuth()
        const resp = await API.get(`mfa-setup/`);
        return resp
    } catch (error) {
        return error.response
    }
}

export const serviceMFAValidate = async(data) => {
    try {
        const API = await ApiAuth()
        const resp = await API.post(`mfa-validate/`, data);
        return resp
    } catch (error) {
        return error.response
    }
}

export const serviceMFADisable = async(data) => {
    try {
        const API = await ApiAuth()
        const resp = await API.post(`mfa-disable/`, data);
        return resp
    } catch (error) {
        return error.response
    }
}

export const serviceMFAActivate = async(data) => {
    try {
        const API = await ApiAuth()
        const resp = await API.post(`mfa-activate/`, data);
        return resp
    } catch (error) {
        return error.response
    }
}

// export const serviceMFARemove = async(data) => {
//     try {
//         const API = await ApiAuth()
//         const resp = await API.post(`mfa-remove/`, data);
//         return resp
//     } catch (error) {
//         return error.response
//     }
// }