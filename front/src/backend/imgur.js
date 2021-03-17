import backendFetch from './backendFetch';

async function getViralContent() {
    return backendFetch(`${process.env.REACT_APP_API_URL}/imgur/viral`).then(res => res.json());
}

export default {
    getViralContent,
};
