import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/project.schema';
import { Model } from 'mongoose';
import {
  CreateProjectDTO,
  Status,
  UpdateProjectDTO,
} from './schema/project.inputs';
import { HIVUser } from 'src/users/schema/user.interface';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async findAll(): Promise<Array<Project>> {
    return await this.projectModel.find().exec();
  }

  async findById(id: string): Promise<Project | null> {
    const res = await this.projectModel.findById(id);
    if (res) return res;
    throw new NotFoundException();
  }

  async create(data: CreateProjectDTO, user: HIVUser): Promise<Project> {
    const payload = {
      ...data,
      createdBy: user.preferred_username,
      createdAt: +new Date(),
      status: 'PENDING',
      statusUpdatedBy: user.preferred_username,
      statusUpdatedAt: +new Date(),
    };

    const res = await this.projectModel.create(payload);
    if (res) return res;
    throw new InternalServerErrorException();
  }

  async updateStatus(
    id: string,
    status: Status,
    user: HIVUser,
  ): Promise<Project> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) throw new NotFoundException();

    this.projectModel.findByIdAndUpdate(id, {
      $set: {
        status,
        statusUpdatedBy: user.preferred_username,
        statusUpdatedAt: +new Date(),
      },
    });

    return null;
  }

  async updateById(
    id: string,
    data: UpdateProjectDTO,
  ): Promise<Project | null> {
    const exists = await this.projectModel.findById(id).exec();
    if (!exists) throw new NotFoundException();

    return await this.projectModel.findByIdAndUpdate(id, data);
  }
}
