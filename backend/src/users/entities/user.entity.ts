import {Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsEmail } from 'class-validator';

@Entity()
export class User {
    @PrimaryColumn()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @Column({ default: false })
    @IsBoolean()
    @ApiProperty({ default: false })
    admin: boolean;
}