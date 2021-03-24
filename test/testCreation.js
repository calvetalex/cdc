const fetch = require('node-fetch');

const normalModule = {
    name: 'Simple Module',
    id: 1,
    modules: [
        {id: 10, fk_parent_id: 1, split: 0, global: true},
    ],
    services: [
        {id: -1, fk_module_id: 10, place: 0, service_type: 5, data: {city: 'Toulouse', type: 'forecast'} },
    ]
}

const verticalSplit = {
    name: 'basic split',
    id: 1,
    modules: [
        {id: 10, fk_parent_id: 1, split: 1, global: true},
        {id: -2, fk_parent_id: 10, split: 0, global: false},
        {id: -3, fk_parent_id: 10, split: 0, global: false},
    ],
    services: [
        {id: -1, fk_module_id: -2, place: 0, service_type: 3, data: {subject:"javascript"} },
        {id: -2, fk_module_id: -3, place: 0, service_type: 2, data: [{"src": "https://i.pinimg.com/originals/76/f8/d7/76f8d7c48c62c2626f1fbac339d4b5d9.jpg"}, {"src": "https://www.actugaming.net/wp-content/uploads/2016/02/horizon-zero-dawn-889x500.jpg"}, {"src": "https://i.jeuxactus.com/datas/jeux/k/i/killzone-shadow-fall/xl/killzone-shadow-fall-5ffa0be3c2608.jpg"}] },
    ]
};

const hardSplit = {
    name: 'hard test',
    id: 1,
    modules: [
        {id: 10, fk_parent_id: 1, split: 2, global: true},
        {id: -2, fk_parent_id: 10, split: 1, global: false},
        {id: -3, fk_parent_id: 10, split: 0, global: false},
        {id: -4, fk_parent_id: -2, split: 0, global: false},
        {id: -5, fk_parent_id: -2, split: 0, global: false},
    ],
    services: [
        {id: -1, fk_module_id: -3, place: 0, service_type: 1, data: {url: 'https://www.youtube.com/watch?v=qJZDyCLewmo'} },
        {id: -2, fk_module_id: -4, place: 0, service_type: 2, data: {src: 'https://i.pinimg.com/originals/76/f8/d7/76f8d7c48c62c2626f1fbac339d4b5d9.jpg'} },
        {id: -3, fk_module_id: -5, place: 0, service_type: 3, data: {subject: 'epitech'} },
    ]
}

const harderSplit = {
    name: 'harder test',
    id: 1,
    modules: [
        {id: 10, fk_parent_id: 1, split: 2, global: true},
        {id: -2, fk_parent_id: 10, split: 1, global: false},
        {id: -3, fk_parent_id: 10, split: 1, global: false},
        {id: -4, fk_parent_id: -2, split: 0, global: false},
        {id: -5, fk_parent_id: -2, split: 0, global: false},
        {id: -6, fk_parent_id: -3, split: 0, global: false},
        {id: -7, fk_parent_id: -3, split: 0, global: false},
    ],
    services: [
        {id: -1, fk_module_id: -4, place: 0, service_type: 1, data: {url: 'https://www.youtube.com/watch?v=9sjWU5dGcGI'} },
        {id: -2, fk_module_id: -5, place: 0, service_type: 4, data: {} },
        {id: -3, fk_module_id: -6, place: 0, service_type: 3, data: {subject: 'hard work'} },
        {id: -4, fk_module_id: -7, place: 0, service_type: 5, data: {city: 'Toulouse', type: 'current'} },
    ]
}

const toDo = [normalModule, verticalSplit, hardSplit, harderSplit];

Promise.all(toDo.map((p, idx) => {
    setTimeout(() => (fetch("http://localhost:8080/profiles", {
        method: 'POST',
        body: JSON.stringify(p),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.status < 200 || res.status > 320 ? console.log("AN ERROR OCCURRED: ",p) : console.log("CREATED : ", p.name)).catch(e => console.error(e))), ((idx * 1500)));
})).catch(e => console.error(e));
