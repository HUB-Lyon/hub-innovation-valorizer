import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';
import { Milestone } from '../entities/milestone.entity'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {IsNotEmpty, IsOptional, IsString, IsNumber, IsEmail, Min, Max, MaxLength, IsFQDN, IsEnum, ValidateNested} from 'class-validator';

export enum ProjectStatus {
    PENDING = 'Pending',
    REFUSED = 'Refused',
    ACCEPTED = 'Accepted',
    ARCHIVED = 'Archived',
}

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;
    
    @Column()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ maxLength: 50 })
    name: string;
    
    @Column()
    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    @ApiProperty({ maxLength: 500 })
    shortDescription: string;
    
    @Column()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;
    
    @Column()
    @IsNumber()
    @Min(0)
    @Max(40)
    @ApiProperty()
    xp: number;
    
    @Column()
    @IsFQDN()
    @ApiProperty()
    github: string;
    
    @Column()
    @IsFQDN()
    @ApiProperty()
    intra: string;
    
    @Column()
    @ApiProperty({description: 'Project images path joined by \'|\''})
    images: string;
    
    @Column({ enum: ['Pending', 'Refused', 'Accepted', 'Archived'], default: 'Pending' })
    @IsEnum(ProjectStatus)
    @ApiProperty({enum: ['Pending', 'Refused', 'Accepted', 'Archived'], default: 'Pending'})
    status: ProjectStatus;
    
    
    @CreateDateColumn()
    @ApiProperty({ default: new Date})
    statusUpdatedAt: Date
    
    @CreateDateColumn()
    @ApiProperty({ default: new Date})
    createdAt: Date;
    
    // TODO: Foreign key
    @ApiPropertyOptional()
    statusUpdatedBy?: any; // User
    
    @ApiProperty()
    createdBy: any // User
    
    @ApiProperty()
    members: any[] // User[]
    
    @ApiProperty()
    materials: any[] // Material[]
    
    @ValidateNested({ each: true })
    @ApiProperty({ type: [Milestone] })
    milestones: Milestone[] // Milestone[]
}
