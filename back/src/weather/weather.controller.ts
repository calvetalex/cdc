import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('/weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}

    @Get(':city')
    async getWeather(@Param('city') city: string): Promise<any> {
        return await this.weatherService.getCurrentWeather(city);
    }

    @Get('next/:city')
    async getForecast(@Param('city') city: string): Promise<any> {
        return await this.weatherService.getWeatherForecast(city);
    }
}