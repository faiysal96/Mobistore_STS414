import axios from 'axios';

const O_URL = 'http://localhost:5000/api/order/';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');


export async function placeOrder(orderData) {
    let response = await axios.post(O_URL + 'add', orderData);
    return response.data;
}


export async function getOrders() {
    let response = await axios.get(O_URL + 'getUserOrders');
    return response.data;
}