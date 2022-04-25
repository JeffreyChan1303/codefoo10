import axios from 'axios';

export const getIGNData = async (URL) => {
    try {
        const { data } = await axios.get(URL);
        return data;
    } catch(e) {
        console.log(e);
    }
}