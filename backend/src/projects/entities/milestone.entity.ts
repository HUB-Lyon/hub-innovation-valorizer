import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, Max } from 'class-validator';

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
}