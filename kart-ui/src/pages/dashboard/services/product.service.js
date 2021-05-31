import axios from 'axios';

const B_URL = 'http://localhost:5000/';



export async function getAllPoducts(query) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

    const response = await axios.get(B_URL + 'api/products/getAll?query=' + query)
    return response.data;
}

export function getImageUrl(product) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

    if (product.images.length) {
        return B_URL + product.images[0].path
    }
    return ''
}

// module.exports = {
//     getAllPoducts
// }