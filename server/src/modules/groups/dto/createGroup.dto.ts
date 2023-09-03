import { GroupPrivacy } from "@common/enums/GroupPrivacy.enum";
import { GroupStatus } from "@common/enums/GroupStatus.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEnum, IsNumber } from "class-validator"
import { Transform } from "class-transformer";

export class CreateGroupDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEnum(GroupPrivacy)
    privacy: GroupPrivacy

    @ApiProperty()
    @IsEnum(GroupStatus)
    status: GroupStatus
    
    @ApiProperty()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    categoryId: number
    
    @ApiProperty({ type: 'string', format: 'binary' }) // Use 'string' type and 'binary' format for file
    image: never; 
}
