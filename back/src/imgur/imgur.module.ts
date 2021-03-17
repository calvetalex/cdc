import { Module, OnModuleInit } from '@nestjs/common';
import { ImgurService } from './imgur.service';
import { ImgurController } from './imgur.controller';

@Module({
    controllers: [ImgurController],
    providers: [ImgurService],
})
export class ImgurModule implements OnModuleInit {
    onModuleInit() {
        console.log('[IMGUR] - start service...');
    }
}