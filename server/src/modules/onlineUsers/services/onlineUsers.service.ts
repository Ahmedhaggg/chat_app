import { OnlineUserCacheRepository } from "@modules/user/repositories/onlineUser.cache.repository";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Redis } from "ioredis";

@Injectable()
export class OnlineUserService {
    constructor(
        private readonly onlineUsersCahceRepository: OnlineUserCacheRepository
    ) {}
    
    async addOnlineUser(userId: number) : Promise<void> {
        let userIsOnline = await this.onlineUsersCahceRepository.checkUserIsOnline(userId);
        if (!userIsOnline)
            await this.onlineUsersCahceRepository.addOnlineUser(userId);
    }

    async removeOnlineUser(userId: number) : Promise<void> {
        await this.onlineUsersCahceRepository.removeOnlineUser(userId)
    }
}