import axios from 'axios';

const B_URL = 'http://localhost:5000/api/products/'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');


export async function getMyProducts() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

    let response = await axios.get(B_URL + 'getSellerProducts')
    return response.data;
}

export async function getProductInfo(id) {
    let response = await axios.get(B_URL + 'getById/' + id);
    return response.data;
}

export async function addProduct(productData) {
    let response = await axios.post(B_URL + 'add', productData);
    return response.data;
}

export async function updateProduct(productData, id) {
    let response = await axios.post(B_URL + 'update/' + id, productData);
    return response.data;
}

export async function addImage(productData) {
    let response = await axios.post(B_URL + 'upload', productData);
    return response.data;
}

export async function updateProductImages(paths, id) {
    let response = await axios.post(B_URL + 'updateProductImages/' + id, paths);
    return response.data;
}

export async function removeImage(list) {
    let response = await axios.post(B_URL + 'removeImages', list);
    return response.data;
}

export async function deleteProduct(productData) {
    let response = await axios.post(B_URL + 'add', productData);
    return response.data;
}

