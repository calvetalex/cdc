import { Injectable } from '@nestjs/common';

const fetch = require('node-fetch');
const apiKey: string = 'edb5ca1920e8cdbb0389dca5da83f9a5';

@Injectable()
export class WeatherService {
    static async weatherFetch(url: string, init: any = {}) {
        return fetch(`http://api.openweathermap.org/data/2.5${url}`, init).then((resp) => {
            if (resp.status < 200 || resp.status > 320) {
                throw resp;
            }
            return resp;
        });
    }

    async getCurrentWeather(city: string): Promise<any> {
        return await WeatherService.weatherFetch(`/weather?q=${city}&appid=${apiKey}&lang=fr`).then(resp => resp.json());
    }

    async getWeatherForecast(city: string): Promise<any> {
        return await WeatherService.weatherFetch(`/forecast?q=${city}&cnt=17&appid=${apiKey}&lang=fr`).then(resp => resp.json());
    }
}