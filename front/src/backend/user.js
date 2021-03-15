import backendFetch from './backendFetch';

async function getById(id) {
    return backendFetch(`${process.env.REACT_APP_API_URL}/users/id/${id}`).then(resp => resp.json()).catch(e => {
        console.error("Internal Server Error: " + e);
        return null;
    });
}

async function getByMail(mail) {
    return backendFetch(`${process.env.REACT_APP_API_URL}/users/mail/${mail}`).then(resp => resp.json()).catch(e => {
        console.error("Internal Server Error: " + e);
        return null;
    });
}

async function getUsers(idList) {
    let res = [];

    idList = idList.filter((a, i, self) => self.indexOf(a) === i);
    res = await Promise.all(idList.map(async (id) => {
        const user = await backendFetch(`${process.env.REACT_APP_API_URL}/users/id/${id}`).then(resp => resp.json());
        if (user) {
            return user;
        }
    })).catch(err => console.error(err));
    return res;
}

async function create(data) {
    return backendFetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(data),
    }).then(resp => resp.json());
}

async function update(data) {
    if (!data.id || data.id === '') {
        return {};
    }
    return backendFetch(`${process.env.REACT_APP_API_URL}/users/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }).then(resp => resp.json());
}

export default {
    getById,
    getByMail,
    getUsers,
    create,
    update,
};
