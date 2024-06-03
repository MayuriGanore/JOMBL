/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports:
  [ 
    MongooseModule.forRoot("mongodb+srv://Mayuri:12345@chatapp.ftkxe9e.mongodb.net/?retryWrites=true&w=majority&appName=ChatApp"),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
