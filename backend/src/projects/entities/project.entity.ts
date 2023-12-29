import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Milestone } from './milestone.entity'
import { Member } from './member.entity'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEmail, Min, Max, MaxLength, IsFQDN, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum ProjectStatus {
    PENDING = 'Pending',
    REFUSED = 'Refused',
    ACCEPTED = 'Accepted',
    DONE = 'Done',
    KO = 'K.-O.',
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
    @Type(() => Number)
    @ApiProperty()
    xp: number;
    
    @Column()
  //  @IsFQDN()
    @IsString()
    @ApiProperty()
    github: string;
    
    @Column()
    @IsFQDN()
    @ApiProperty()
    intra: string;
    
    @Column()
    @ApiProperty({description: 'Project images path joined by \'|\''})
    images: string;
    
    @Column({ enum: Object.values(ProjectStatus), default: ProjectStatus.PENDING })
    @IsEnum(ProjectStatus)
    @ApiProperty({ enum: Object.values(ProjectStatus), default: ProjectStatus.PENDING })
    status: ProjectStatus;
    
    @CreateDateColumn()
    @ApiProperty({ default: new Date})
    statusUpdatedAt: Date;
    
    @CreateDateColumn()
    @ApiProperty({ default: new Date})
    createdAt: Date;
    
    @OneToMany(() => Milestone, (milestone) => milestone.project, { cascade: true })
    @ValidateNested({ each: true })
    @ApiProperty({ type: () => [Milestone] })
    milestones: Milestone[]

    @OneToMany(() => Member, (member) => member.project, { cascade: true })
    @ValidateNested({ each: true })
    @Type(() => Member)
    @ApiProperty()
    members: Member[]

    // TODO: Foreign key
    @ApiPropertyOptional()
    statusUpdatedBy?: any; // User
    
    @ApiProperty()
    createdBy: any // User
    
    @ApiProperty()
    materials: any[] // Material[]
}
