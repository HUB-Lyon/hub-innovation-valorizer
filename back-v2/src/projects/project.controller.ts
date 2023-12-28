import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import {
  CreateProjectDTO,
  UpdateProjectDTO,
  UpdateStatusDTO,
} from './schema/project.inputs';
import { User } from 'src/decorators/user';
import { HIVUser } from 'src/users/schema/user.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('/projects')
export class ProjectController {
  constructor(private projectSerivce: ProjectService) {}
  @Get('/')
  async getAll() {
    return await this.projectSerivce.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.projectSerivce.findById(id);
  }

  @Post('/')
  @HttpCode(201)
  async createProject(@Body() data: CreateProjectDTO, @User() user: HIVUser) {
    return await this.projectSerivce.create(data, user);
  }

  @Post('/update-status/:id')
  async updateStatusById(
    @Param('id') id: string,
    @Body() data: UpdateStatusDTO,
    @User() user: HIVUser,
  ) {
    return await this.projectSerivce.updateStatus(id, data.status, user);
  }

  @Patch('/:id')
  async updateById(@Param('id') id: string, @Body() data: UpdateProjectDTO) {
    return await this.projectSerivce.updateById(id, data);
  }
}
