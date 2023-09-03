import { GroupPrivacy } from "@common/enums/GroupPrivacy.enum";
import { GroupStatus } from "@common/enums/GroupStatus.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEnum, IsNumber } from "class-validator"
import { Transform } from "class-transformer";

export class UpdateGroupDto {
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

}
