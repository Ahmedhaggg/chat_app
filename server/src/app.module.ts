import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { GroupsModule } from './modules/groups/groups.module';
import config from './config';
import { DatabaseSeederService } from './DatabaseSeederService';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from '@shared/uploaderModules/cloudinaryModule/Cloudinary.module';
import { OnlineUsersModule } from './modules/onlineUsers/onlineUsers.module';
import { RedisCacheMoudle } from 'src/shared/redisCache/redisCache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ({
          ...configService.get('database')
      })}
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
          return {
            secret: config.get("JWT_SECRET"),
            signOptions: { expiresIn: "1h" }
          }
      },
      global: true
    }),
    CloudinaryModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          cloudName: config.get("CLOUDINARY_CLOUD_NAME"),
          apiKey: config.get("CLOUDINARY_API_KEY"),
          apiSecret: config.get("CLOUDINARY_API_SECRET")
        }
      },
    }),
    RedisCacheMoudle.registerAsync(),
    AuthModule,
    UserModule,
    GroupsModule,
    OnlineUsersModule
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseSeederService],
})
export class AppModule {
  constructor(private readonly databaseSeederService: DatabaseSeederService) {}

  async onModuleInit() {
    await this.databaseSeederService.seedData();
  }
}

// CacheModule.registerAsync<RedisClientOptions>({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     store: redisStore as any,
    //     host: configService.get('REDIS_HOST'),
    //     port: configService.get('REDIS_PORT'),
    //     ttl: 0,
    //     maxMemoryPolicy: 'allkeys-lru'
    //   }),
    //   isGlobal: true,
    // }),
    // RedisModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     console.log(config.get('REDIS_HOST'))
    //     return ({
    //     host: config.get('REDIS_HOST'),
    //     port: config.get('REDIS_PORT')
    //   })}
    // }),