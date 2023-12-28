import { IsOptional, IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateMilestoneDto } from './create-milestone.dto'
import { Project } from '../entities/project.entity'
import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { Type } from 'class-transformer';

export class Image {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    name: string

    @IsString()
    @IsNotEmpty()
    content: string
}

export class CreateProjectDto
extends PickType(Project, ['name', 'shortDescription', 'description', 'xp', 'github', 'members']) {
    @ValidateNested({ each: true })
    @Type(() => CreateMilestoneDto)
    @ApiProperty({ type: [CreateMilestoneDto] })
    milestones: CreateMilestoneDto[]
    
    @ApiProperty()
    materials: any[] // TODO: Material[] only id and quantity
    
    @ValidateNested({ each: true })
    @Type(() => Image)
    @ApiProperty({ type: [Image], description: 'Images sent in base64' })
    images: Image[];
}
