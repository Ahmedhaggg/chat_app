import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

@Controller('v1/auth/tokens')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post("/")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                refreshToken: {
                    type: "string"
                }
            }
        }
    })
    async refreshAccessToken(@Body("refreshToken") refreshToken: string) {
        let newAccessToken = await this.authService.refreshAccessToken(refreshToken);
        return { newAccessToken }
    }
}
