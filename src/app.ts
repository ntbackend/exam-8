import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsModule } from './cars/cars.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://ibrohimjoraboyev01:0DPDn9iARUusnyDM@cluster0.zoqbea9.mongodb.net/myLastProjectWithNajotTalim',
    ),
    CarsModule,
    UsersModule,
    SuggestionsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
