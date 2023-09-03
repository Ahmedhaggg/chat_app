import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FilterGroupsDto {
    @ApiPropertyOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    limit: number;

    @ApiPropertyOptional()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    page: number;


    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name: string;

    @ApiPropertyOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    categoryId: number;
}