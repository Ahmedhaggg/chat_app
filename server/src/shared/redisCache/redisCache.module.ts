import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

@Module({})
export class RedisCacheMoudle {
    static registerAsync() : DynamicModule {
        return {
            module: RedisCacheMoudle,
            providers: [
                {
                    provide: 'REDIS_CLIENT',
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => {
                        return new Redis({
                          host: configService.get('REDIS_HOST'),
                          port: configService.get('REDIS_PORT'),
                        });
                    }
                }
            ],
            exports: ['REDIS_CLIENT'],
            global: true
        }
    }
}


// providers: [
//     {
//         provide: 'REDIS_CLIENT',
//         inject: [ConfigService],
//         useFactory: (configService: ConfigService) => {
//             return new Redis({
//               host: configService.get('REDIS_HOST'),
//               port: configService.get('REDIS_PORT'),
//             });
//         }
//     }
// ],
// exports: ['REDIS_CLIENT']