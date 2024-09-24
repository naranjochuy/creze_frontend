import axios from 'axios';

const baseURL = 'http://ec2-54-80-48-166.compute-1.amazonaws.com/api/';

export const Api = async() => {
    return axios.create({
        baseURL,
        headers: { 'content-type': 'application/json' },
        timeout: 8000
    })
}

export const ApiAuth = async() => {

    const token = localStorage.getItem('token') || ''

    return axios.create({
        baseURL,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        timeout: 8000
    })
}
