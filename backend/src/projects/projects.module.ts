import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity'
import { Milestone } from './entities/milestone.entity'
import { Member } from './entities/member.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Project, Milestone, Member])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
