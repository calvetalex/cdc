import { Injectable } from '@nestjs/common';
const fetch = require('node-fetch');

@Injectable()
export class ImgurService {
    constructor() {}

    async getViralContent(): Promise<any> {
        try {
            return fetch('https://api.imgur.com/3/gallery/hot/viral/', { headers: { Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}` } }).then(res => res.json());
        } catch (e) {
            console.error('[IMGUR] - Cannot get viral content', e);
            return [];
        }
    }
}