import { Module } from '@nestjs/common';
import { OnlineUSerController } from './controllers/onlineUsers.controller';
import { OnlineUsersCacheRepository } from './repositories/onlineUser.cache.repository';
import { OnlineUserGateway } from './gateways/onlineUser.gateway';
import { OnlineUserService } from './services/onlineUsers.service';

@Module({
    controllers: [OnlineUSerController],
    providers: [OnlineUsersCacheRepository,  OnlineUserGateway, OnlineUserService]
})

export class OnlineUsersModule {}
