import axios from 'axios';

const U_URL = 'http://localhost:5000/api/'
export async function getUserInfo(params) {
    let response = await axios.get(U_URL+'auth/authenticated');
    return response.data
}

export async function updateUserInfo(userInfo) {
    let response = await axios.put(U_URL+'users/update', userInfo)
    return response.data

}