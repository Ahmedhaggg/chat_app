import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, ParseIntPipe, HttpException, InternalServerErrorException, UseGuards, BadRequestException, UsePipes } from '@nestjs/common';
import { GroupsService } from '../services/groups.service';
import { CreateGroupDto } from '../dto/createGroup.dto';
import { UpdateGroupDto } from '../dto/updateGroup.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReqUser } from '@common/decorators/user.decoratory';
import { FilterGroupsDto } from '../dto/filterGroups.dto';
import { AuthGuard } from '@common/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CloudinaryService } from '@modules/uploaderModules/cloudinaryModule/services/cloudinary.service';

@Controller('v1/groups')
@ApiBearerAuth()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService, private cloudinaryService : CloudinaryService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async create(
    @UploadedFile() file: Express.Multer.File, 
    @Body() createGroupDto: CreateGroupDto, 
    @ReqUser() user: any
  ) {
    let uploadedImageUrl;
    try {
      let uploadImage = await this.cloudinaryService.upload(file);
      uploadedImageUrl = uploadImage.url;
      let newGroup = await this.groupsService.create(user.id, createGroupDto, uploadImage.url);
      return { newGroup };
    } catch (error) {
      console.log(error)
      await this.cloudinaryService.remove(uploadedImageUrl)
      throw new InternalServerErrorException()
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: FilterGroupsDto) {
    let groups = await this.groupsService.findAll(query);
    return { groups };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number, @ReqUser() user) {
    let group  = await this.groupsService.findOne({ id });
    return { group };
  }

  @UseGuards(AuthGuard)
  @Get("/code/:code")
  async findOneByCode(@Param('code') code: string, @ReqUser() user) {
    let group = await this.groupsService.findOne({ code });
    return { group }
  }
  
  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateGroupDto: UpdateGroupDto) {
    let updatedGroup = await this.groupsService.update({id, newGroupdata: updateGroupDto });
    return { newData: updatedGroup }
  }

  @Patch(':id/image')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('newImage'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        newImage: { type: 'string',format: 'binary' },
      },
    },
  })
  async updateImage(@Param("id", ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File) {
    let newGroupImage = await this.cloudinaryService.upload(file);
    try {
      let updatedGroup = await this.groupsService.update({id, newImage: newGroupImage.url });
      return { newData: updatedGroup }
    } catch(error) {
      await this.cloudinaryService.remove(newGroupImage.url);
    } 
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @ReqUser() user: any) {
    let { image } = await this.groupsService.remove(id, user.id);
    await this.cloudinaryService.remove(image);
    return { message: "group is deleted successfully"}
  }
}
