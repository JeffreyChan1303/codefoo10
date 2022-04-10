import axios from 'axios';

// const URL = 'https://ign-apis.herokuapp.com/';

// const URL = 'http://localhost:3000/videos?startIndex=30&count=5';
// const URL = 'http://localhost:3000/videos?startIndex=50&count=4';



export const getIGNData = async (URL) => {
    try {
        const { data } = await axios.get(URL);
        return data;
    } catch(e) {
        console.log(e);
    }
}