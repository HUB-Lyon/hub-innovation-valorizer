import { IsNumber, IsArray, ValidateNested } from 'class-validator';
import { CreateMilestoneDto } from './create-milestone.dto'
import { Project } from '../entities/project.entity'
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { Type } from 'class-transformer';

export class CreateProjectDto
extends PickType(Project, ['name', 'shortDescription', 'description', 'xp', 'github']) {
    @IsNumber({}, { each: true })
    @Type(() => Number)
    @ApiProperty()
    membersIds: number[]; // TODO Member[] only id and roleId
    
    @ValidateNested({ each: true })
    @Type(() => CreateMilestoneDto)
    @ApiProperty({ type: [CreateMilestoneDto] })
    milestones: CreateMilestoneDto[]
    
    @ApiProperty()
    materials: any[] // TODO: Material[] only id and quantity
    
    @ApiProperty({ type: [Object], description: 'Images sent via formData' })
    images: Express.Multer.File[];
}
