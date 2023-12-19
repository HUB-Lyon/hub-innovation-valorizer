import { IsNumber } from 'class-validator';
import { Milestone } from '../entities/milestone.entity'
import { OmitType } from '@nestjs/swagger'

export class CreateMilestoneDto
extends OmitType(Milestone,  ['id'] as const) {}