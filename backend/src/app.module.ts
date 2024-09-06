import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './db/config';
import { VideoModule } from './features/video/video.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    VideoModule,
  ],
})
export class AppModule {}