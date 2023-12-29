import {Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { Project } from './project.entity'

@Entity()
export class Member {
    @PrimaryColumn()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;
    
    @Column()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    role: string;

    @ManyToOne(() => Project, (project) => project.members, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    project: Project;
}