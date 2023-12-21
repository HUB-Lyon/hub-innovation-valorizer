import { IsNumber } from 'class-validator';
import { CreateMilestoneDto } from './create-milestone.dto'
import { Project } from '../entities/project.entity'
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'

export class CreateProjectDto
extends PickType(Project, ['name', 'shortDescription', 'description', 'xp', 'github', 'intra']) {
    @IsNumber({}, { each: true })
    @ApiProperty()
    membersIds: number[]; // TODO Member[] only id and roleId
    
    @ApiProperty({ type: [CreateMilestoneDto] })
    milestones: CreateMilestoneDto[]
    
    @ApiProperty()
    materials: any[] // TODO: Material[] only id and quantity
    
    @ApiProperty({ type: [Object], description: 'Images sent via formData' })
    images: Express.Multer.File[];
}
