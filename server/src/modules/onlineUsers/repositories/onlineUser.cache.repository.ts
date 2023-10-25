import Redis from "ioredis";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class OnlineUsersCacheRepository {
    private ONLINE_USERS_KEY: "users:online"

    constructor(
        @Inject('REDIS_CLIENT') private redisClient: Redis,
    ) {}

    async checkUserIsOnline(userId: number) : Promise<boolean> {
        let checkResult = await this.redisClient.sismember(this.ONLINE_USERS_KEY, userId);
        return checkResult == 1 ? true : false;
    }
    async checkListIsOnline(userIds: number[]) : Promise<{ id: number, isOnline: boolean }[]> {
        let checkResult = await this.redisClient.smismember(this.ONLINE_USERS_KEY, userIds);
        let list = userIds.map((result, i) => ({
            id: userIds[i],
            isOnline: result == 1
        }))
        return list;
    }
    async addOnlineUser(userId: number) : Promise<void> {
        await this.redisClient.sadd(this.ONLINE_USERS_KEY, userId);
    }
    async removeOnlineUser(userId: number) : Promise<void> {
        await this.redisClient.srem(this.ONLINE_USERS_KEY, userId)
    }
}