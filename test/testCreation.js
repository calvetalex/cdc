const fetch = require('node-fetch');

const data = {
    name: 'testCreationFromFetch',
    id: 1,
    modules: [
        {id: -1, fk_parent_id: 1, split: 1, global: true},
        {id: -2, fk_parent_id: -1, split: 0, global: false},
        {id: -3, fk_parent_id: -1, split: 0, global: false},
    ],
    services: [
        {id: -1, fk_module_id: -2, place: 0, service_type: 3, data: {subject:"javascript"} },
        {id: -2, fk_module_id: -3, place: 0, service_type: 4, data: {} },
    ]
};

fetch("http://localhost:8080/profiles", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',
    }
}).then(res => res.json()).then(res => console.log(res)).catch(e => console.error(e));