import backendFetch from './backendFetch';

async function getCurrent(city = 'Toulouse') {
    return backendFetch(`${process.env.REACT_APP_API_URL}/weather/${city}`).then(res => res.json());
}

async function getForecast(city = 'Toulouse') {
    return backendFetch(`${process.env.REACT_APP_API_URL}/weather/next/${city}`).then(res => res.json());
}

export default {
    getCurrent,
    getForecast,
};
