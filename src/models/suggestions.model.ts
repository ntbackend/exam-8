import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.model';

export type SuggestionDocument = HydratedDocument<Suggestion>;

@Schema({ timestamps: true })
export class Suggestion {
  @Prop()
  description: string;

  @Prop()
  name: string;

  @Prop()
  phone: string; 

  @Prop({ type: String, ref: User.name })
  userId: string;
}

export const SuggestionSchema = SchemaFactory.createForClass(Suggestion);
