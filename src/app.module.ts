import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConnection } from './env';

const connect = new DatabaseConnection();

@Module({
  imports: [ProductModule, MongooseModule.forRoot(connect.url())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
