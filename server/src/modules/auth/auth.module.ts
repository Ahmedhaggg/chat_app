import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { GoogleAuthController } from './controllers/googleAuth.controller';
import { AuthService } from './services/auth.service';
import { GoogleStrategy } from './stratgies/GoogleStrategy';
import { PassportModule } from '@nestjs/passport';
 
@Module({
  imports: [
    UserModule, 
    PassportModule.register({ defaultStrategy: "google" })
  ],
  controllers: [
    AuthController, 
    GoogleAuthController
  ],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
