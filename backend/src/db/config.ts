import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'yourpassword',
  database: process.env.DB_NAME || 'youtube_gallery',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};