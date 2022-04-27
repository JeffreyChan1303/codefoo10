const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors({
    origin: '*'
}))

app.get(':endpoint([\\/\\w\\.-]*)', (req, res) => {
    const query = `?startIndex=${req.query.startIndex}&count=${req.query.count}`
    let endpoint = 'https://ign-apis.herokuapp.com' + req.params.endpoint + query;
    axios.get(endpoint)
        .then(response => {
            res.send(response.data);
        }).catch(e => {
            console.log(e)
        })
})
console.log('server started')

app.listen(3000); // this should be in the readme file