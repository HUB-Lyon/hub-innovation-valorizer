import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectStatus } from './entities/project.entity'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, imagesPaths: string[]) {
    // TODO: create intra activities
    const intra = 'intra.epitech.eu'

    return await this.projectRepository.save({
      ...createProjectDto,
      intra,
      images: imagesPaths.join('|'),
    })
  }

  async findAll(admin: Boolean = false) {
    // TODO: Filter on status, name
    // TODO: Only admin or project member for status other then accepted/done
    const status = [ProjectStatus.ACCEPTED, ProjectStatus.DONE];

    return await this.projectRepository
      .createQueryBuilder('project')
      .select(['project.id', 'project.name', 'project.shortDescription', 'project.images', 'project.status'])
      .leftJoin('project.milestones', 'milestones')
      .addSelect(['milestones.id', 'milestones.name', 'milestones.description', 'milestones.date'])
      //.where("status IN(:...status)", { status })
      .getMany()
  }

  async findOne(id: number) {
    // TODO: Only admin or project member for status other then accepted/done
    // TODO: Add status and creation info if admin
    // TODO: Add members and materials once created

    return await this.projectRepository
      .createQueryBuilder('project')
      .select(['project.id', 'project.name', 'project.shortDescription', 'project.description', 'project.xp', 'project.github', 'project.intra', 'project.images', 'project.status'])
      .leftJoin('project.milestones', 'milestones')
      .addSelect(['milestones.id', 'milestones.name', 'milestones.description', 'milestones.date'])
      .leftJoin('project.members', 'members')
      .addSelect(['members.email', 'members.role'])
      .where("project.id = :id", { id })
      //.where("status IN(:...status)", { status })
      .getOne()
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
