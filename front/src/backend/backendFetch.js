import Cookies from 'js-cookie';
import Backend from '.';

export default async function backendFetch(url, init = {}) {
    init = Object.assign(init, {
        headers: {
            Authorization: `bearer ${Cookies.get('token-user')}`,
            'Content-Type': 'application/json',
        },
    });
    return fetch(url, init).then((resp) => {
        if (resp.status === 401) {
            return Backend.oauth.validateOrRenewToken().then((res) => {
                if (res) {
                    return backendFetch(url, init);
                }
                return resp;
            });
        }
        if (resp.status < 200 || resp.status > 320) {
            throw resp;
        }
        return resp;
    });
}
