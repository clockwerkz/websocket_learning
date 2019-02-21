
const axios = require('axios');
//USD, CAD, AMOUNT
// 20 USD is worth 26 CAD. You can spend these in the following countries: Canada
access_key = '0df628b3f7b00808e1bf521618ef3bd7';
api_endpoint = 'http://apilayer.net/api/live';
restCurrencyEndpoint = 'https://restcountries.eu/rest/v2/currency/';
//from = USD, to = CAD, amount = 20, format =1
const convertCurrency = async (oldCurrency, newCurrency, amount) => {
    const exchangeRate = await getExchangeRate(oldCurrency.toUpperCase(), newCurrency.toUpperCase());
    const newAmount = (amount * exchangeRate).toFixed(2);
    const countries = await getCountries(newCurrency);
    return `${amount} ${oldCurrency} is worth ${newAmount} ${newCurrency}. You can spend these in the following countries: ${countries.join(', ')}.`;
}


const getExchangeRate = async (from, to) => {
    try {
        const res = await axios.get(`${api_endpoint}?access_key=${access_key}&currencies=${from},${to}&format=1`);
        const rate = res.data.quotes[`${from}${to}`]; 
        if (isNaN(rate)) {
            throw new Error();
        }
        return rate;
    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
    }
}

const getCountries = async (currencyCode) => {
    try {
    const res = await axios.get(`${restCurrencyEndpoint}${currencyCode}`);
    return res.data.map(country => country.name);
    } catch (err) {
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
}

convertCurrency('usd','cad',20.00)
    .then(res => console.log(res))
    .catch(err => console.log(err.message));


const add = async (a,b) => {
    return a + b + c;
}

const doWork = async () => {
    try {
        const result = await add(12,13);
        return result;
    } catch (e) {
        return 10;
    }
}

doWork().then(data => {
    console.log(data);
}).catch(err => {
    console.log('Something went wrong');
});