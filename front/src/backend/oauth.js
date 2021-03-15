import Cookies from 'js-cookie';

async function login(data) {
    if (!data || !data.username || !data.password) {
        return null;
    }
    console.log(data)
    return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(resp => resp.json()).then(resp => {
        if (resp && resp.user && Object.keys(resp.user).length !== 0) {
            const { token, ...res } = resp.user;
            Cookies.set('token-user', token.token, { path: '/', domain: window.location.host });
            Cookies.set('refresh-token', token.refresh_token,{ path: '/', domain: window.location.host })
            return res;
        }
        return {};
    }).catch(e => console.error(e));
}

async function validateOrRenewToken() {
    let newToken = await fetch(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
        method: 'POST',
        body: JSON.stringify({ refresh_token: Cookies.get('refresh-token') }),
    });
    newToken = await newToken.json();
    if (!newToken || Object.keys(newToken).length === 0) {
        Cookies.remove('token-user', { path: '/', domain: window.location.host });
        Cookies.remove('refresh-token', { path: '/', domain: window.location.host });
        return false;
    }
    const { token, refresh_token } = newToken;
    Cookies.set('token-user', token, { path: '/', domain: window.location.host });
    Cookies.set('refresh-token', refresh_token, { path: '/', domain: window.location.host });
    return true;
}

export default {
    login,
    validateOrRenewToken,
};
