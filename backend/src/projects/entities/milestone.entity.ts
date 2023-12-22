import {Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, Max } from 'class-validator';
import { Project } from './project.entity'

@Entity()
export class Milestone {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;
    
    @Column()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;
    
    @Column()
    @IsNotEmpty()
    @IsString()
    @Max(500)
    @ApiProperty()
    description: string;
    
    @Column()
    @IsDate()
    @ApiProperty()
    date: Date;

    @ManyToOne(() => Project, (project) => project.milestones, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    project: Project;
}