import axios from 'axios';


export const getPossessions = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/possession`);
        return response.data.data.possessions;
    } catch (error) {
        console.error('Erreur lors de la récupération des possessions:', error);
        throw error;
    }
};
export const createPossession = (possession) => {
    return axios.post(`http://localhost:5000/possession/create`, possession);
};

export const updatePossession = (libelle, possession) => {
    return axios.put(`http://localhost:5000/possession/${libelle}`, possession);
};

export const closePossession = (libelle) => {
    return axios.post(`http://localhost:5000/possession/${libelle}/close`);
};
