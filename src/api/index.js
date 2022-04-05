import axios from 'axios';

// const URL = 'https://ign-apis.herokuapp.com/';

// const URL = 'http://localhost:3000/videos?startIndex=30&count=5';
const URL = 'http://localhost:3000/videos?startIndex=50&count=4';



export const getIGNData = async () => {
    // axios.get(URL)
    //     .then((res) => {
    //         console.log(res);
    //         return res;
    //     })
    //     .catch(e => {
    //         console.log(e);
    //     })


    // fetch('https://ign-apis.herokuapp.com/videos?startIndex=30&count=5')
    //     .then(res => res.json())
    //     .then(data => {
    //         return data;
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //     })


    try {
        const { data } = await axios.get(URL);
        return data;
    } catch(e) {
        console.log(e);
    }
}