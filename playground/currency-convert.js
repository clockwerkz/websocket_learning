
const axios = require('axios');
//USD, CAD, AMOUNT
// 20 USD is worth 26 CAD. You can spend these in the following countries: Canada
access_key = '0df628b3f7b00808e1bf521618ef3bd7';
api_endpoint = 'http://apilayer.net/api/live';
//from = USD, to = CAD, amount = 20, format =1
const convertCurrency = async (oldCurrency, newCurrency, amount) => {
    const exchange = fetch(`${api_endpoint}?access_key=${access_key}&currencies=${oldCurrency},${newCurrency}&format=1`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

}


const getExchangeRate = (from, to) => {
    axios.get(`${api_endpoint}?access_key=${access_key}&currencies=${from},${to}&format=1`)
        .then(res => console.log(res));
}


getExchangeRate('USD', 'CAD');