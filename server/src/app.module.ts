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
import { CloudinaryModule } from '@modules/uploaderModules/cloudinaryModule/Cloudinary.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return ({
          ...configService.get('database')
      })}
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
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
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          cloudName: config.get("CLOUDINARY_CLOUD_NAME"),
          apiKey: config.get("CLOUDINARY_API_KEY"),
          apiSecret: config.get("CLOUDINARY_API_SECRET")
        }
      },
    }),
    AuthModule,
    UserModule,
    GroupsModule
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

