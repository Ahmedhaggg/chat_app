import { IsNotEmpty, IsString } from "class-validator";

export class ProfileDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    @IsString()
    photo: string
}
