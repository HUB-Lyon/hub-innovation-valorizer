import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiTags, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Uploader } from "../global/utils/uploader";
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

import { Public } from '../global/decorators/public.decorator';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  
  @Public() // TEMP
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 100, {
      storage: diskStorage({
        destination: Uploader.temporaryPath
      }),
    })
  )
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: Project, description: 'Create a new project' })
  @ApiNotFoundResponse({ description: 'Member or material not found' })
  async create(
    @Req() req,
    @Res() res,
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles() images: Array<Express.Multer.File>
  ) {
    try {
      let imagesPaths: any[] = [];
      try {
        await Promise.all(
          images.map(async file => imagesPaths.push(await Uploader.handlePublicFile(file)))
        )
      } catch (e) {
        console.error(e)
        return res.status(HttpStatus.BAD_REQUEST).json({ message: "Images upload failed" });
      }

      const project = this.projectsService.create(createProjectDto, imagesPaths);
      return res.status(HttpStatus.CREATED).json(project);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Project creation failed',
        err
      });
    }
  }

  @Public() // TEMP
  @Get()
  @ApiOkResponse({ type: Project, description: 'Get all projects basics informations' })
  async findAll(@Req() req, @Res() res) {
    try {
      const projects = await this.projectsService.findAll();
      return res.status(HttpStatus.OK).json(projects);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Projects recuperation failed',
        err
      });
    }
  }

  @Public() // TEMP
  @Get(':id')
  async findOne(@Req() req, @Res() res, @Param('id') id: number) {
    try {
      const project = await this.projectsService.findOne(id);
      if (!project) return res.status(HttpStatus.NOT_FOUND).json();
      return res.status(HttpStatus.OK).json(project);
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Project recuperation failed',
        err
      });
    }  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
