import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MemberAndRole, Milestone, Status } from './project.inputs';

@Schema()
export class Project extends Document {
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  shortDescription: string;

  @Prop()
  description: string;

  @Prop()
  members: Array<MemberAndRole>;

  @Prop()
  github: string;

  @Prop()
  xp: number;

  @Prop()
  milestones: Array<Milestone>;

  @Prop()
  images: Array<string>;

  @Prop()
  createdBy: string;

  @Prop()
  createdAt: number;

  @Prop()
  status: Status;

  @Prop()
  statusUpdatedBy: string;

  @Prop()
  statusUpdatedAt: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
