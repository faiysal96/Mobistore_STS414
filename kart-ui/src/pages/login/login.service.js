import axios from 'axios'


export function login(email, password) {
    return axios.post('http://localhost:5000/api/auth/signin', {
        email,
        password
    })
}


export function register(firstName, lastName, email, password) {
    return axios.post('http://localhost:5000/api/auth/signup', {
        firstName,
        lastName,
        email,
        password
    })
}
