import axios from 'axios';

export const getIGNData = async (URL) => {
    try {
        const { data } = await axios.get(`/api${URL}`);
        return data;
    } catch(e) {
        console.log(e);
    }
}