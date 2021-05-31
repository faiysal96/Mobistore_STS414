import axios from 'axios';

const C_URL = 'http://localhost:5000/api/cart/'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');


export async function addToCart(cartData) {
    let response = await axios.post(C_URL + 'add', cartData);
    return response.data;
}

export async function removeFromCart(productId) {
    let response = await axios.delete(C_URL + 'delete-from-product/'+ productId);
    return response.data;
}

export async function getProductCartInfo(productId) {
    let response = await axios.get(C_URL + 'productInfo/' + productId);
    return response.data;
}

export async function updateCartQunatityApi(cartId, cartData) {
    let response = await axios.put(C_URL + 'updatequantity/' + cartId, cartData);
    return response.data;
}


export async function getCartItems() {
    let response = await axios.get(C_URL + 'cartitems');
    return response.data;
}

export async function clearCart() {
    let response = await axios.get(C_URL + 'clearCart');
    return response.data;
}