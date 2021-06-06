import axios from 'axios';

const SS_URL = 'http://localhost:5000/api/support/';



export async function getAll() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');
    let response = await axios.get(SS_URL + 'getAll');
    return response.data;
}

export async function getMyPendingIssues() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');
    let response = await axios.get(SS_URL + 'getMyPendingIssues');
    return response.data;
}

export async function getMyIssues() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');
    let response = await axios.get(SS_URL + 'getMyIssues');
    return response.data;
}

export async function getIssueById(id) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');
    let response = await axios.get(SS_URL + 'getIssueById/' + id);
    return response.data;
}


export async function addIssue(data) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');
    let response = await axios.post(SS_URL + 'addIssue', data);
    return response.data;
}

export async function updateIssueConv(data, id) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');
    let response = await axios.post(SS_URL + 'updateIssueConv/' + id, data);
    return response.data;
}

export async function updateIssueStatus(data, id) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');
    let response = await axios.post(SS_URL + 'updateIssueStatus/' + id, data);
    return response.data;
}