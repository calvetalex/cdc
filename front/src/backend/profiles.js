import backendFetch from './backendFetch';

async function getAll() {
    return backendFetch(`${process.env.REACT_APP_API_URL}/profiles`).then(resp => resp.json());
}

async function getProfileModules(name) {
    if (!name) {
        return {};
    }
    return backendFetch(`${process.env.REACT_APP_API_URL}/profiles/${name}`).then(resp => resp.json());
}

async function createProfile(data) {
    const { subModules, services, name } = data;
    if (subModules && subModules.length !== 0) {
        console.log('there is subModules');
        console.log(subModules, services);
    }
    return backendFetch(`${process.env.REACT_APP_API_URL}/profiles`, {
        method: 'POST',
        body: JSON.stringify(name),
    }).then(resp => resp.json());
}

export default {
    getAll,
    getProfileModules,
    createProfile,
};
