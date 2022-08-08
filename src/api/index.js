import axios from 'axios';

export const getIGNData = async (startIndex) => {
    try {
        const { data } = await axios.get(`/videos?startIndex=${startIndex}&count=20`);
        return data;
    } catch(e) {
        console.log(e);
    }
}