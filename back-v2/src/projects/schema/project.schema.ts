import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MemberAndRole, Milestone } from './project.inputs';

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
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
