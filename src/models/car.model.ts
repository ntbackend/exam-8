import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarDocument = HydratedDocument<Car>;

export enum CarStatus {
  NEW = 'new',
  USED = 'used',
}

@Schema({ timestamps: true })
export class Car {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({ enum: CarStatus })
  status: CarStatus;

  @Prop()
  city: string;

  @Prop()
  year: string;

  @Prop()
  model: string;

  @Prop()
  phone: string;

  @Prop()
  telegram: string;

  @Prop({ type: [String] })
  imageUrl?: string[];
}

export const CarSchema = SchemaFactory.createForClass(Car);
