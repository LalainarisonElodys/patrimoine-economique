import axios from 'axios';

const API_URL = 'http://localhost:5000/possession';

export const getPossessions = () => {
    return axios.get(API_URL);
};

export const createPossession = (possession) => {
    return axios.post(API_URL, possession);
};

export const updatePossession = (libelle, possession) => {
    return axios.put(`${API_URL}/${libelle}`, possession);
};

export const closePossession = (libelle) => {
    return axios.post(`${API_URL}/${libelle}/close`);
};
