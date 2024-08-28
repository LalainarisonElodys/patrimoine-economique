import axios from 'axios';

const API_URL = 'http://localhost:5000/patrimoine';

export const getValeurPatrimoine = (date) => {
    return axios.get(`${API_URL}/${date}`);
};

export const getValeurPatrimoineRange = (rangeData) => {
    return axios.post(`${API_URL}/range`, rangeData);
};
