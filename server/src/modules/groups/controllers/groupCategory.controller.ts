import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GroupCategoryService } from '../services/groupCategory.service';
import { AuthGuard } from '@common/guards/auth.guard';
import { ApiBearerAuth } from "@nestjs/swagger"
@Controller('v1/groups-categories')
@ApiBearerAuth()
export class GroupCategoryController {
    constructor (private groupCategoryService: GroupCategoryService) {}
    
    @Get("/")
    @UseGuards(AuthGuard)
    async findAll() {
        let categories = await this.groupCategoryService.findAll();
        return { categories }
    }
}
