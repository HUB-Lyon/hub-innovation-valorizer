import { CreateMilestoneDto } from './create-milestone.dto'
import { PartialType } from '@nestjs/swagger'

export class UpdateMilestoneDto
extends PartialType(CreateMilestoneDto) {}