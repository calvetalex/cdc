import backendFetch from './backendFetch';

async function getTweetsAbout(subject) {
    return backendFetch(`${process.env.REACT_APP_API_URL}/twitter/${subject}`).then(res => res.json());
}

export default {
    getTweetsAbout,
};
