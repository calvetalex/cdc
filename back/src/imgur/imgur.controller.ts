import { Controller, Get } from '@nestjs/common';
import { ImgurService } from './imgur.service';

@Controller('imgur')
export class ImgurController {
    constructor(private readonly imgurService: ImgurService) {}

    @Get('viral')
    async getViralContent(): Promise<any[]> {
        return await this.imgurService.getViralContent().then(res => res.data);
    }
}