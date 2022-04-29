import axios from 'axios';

export const getIGNData = async (URL) => {
    try {
        const { data } = await axios.get(`https://ign-apis.herokuapp.com${URL}`);
        return data;
    } catch(e) {
        console.log(e);
    }
}