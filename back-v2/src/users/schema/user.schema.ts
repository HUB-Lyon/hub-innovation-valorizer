import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  _id: Types.ObjectId;

  @Prop()
  email: string;

  @Prop({ default: false })
  admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
