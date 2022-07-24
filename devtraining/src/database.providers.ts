import { DataSource } from 'typeorm';
import { CourseRefactoring1657725180075 } from './migrations/1657725747826-CourseRefactoring';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'docker',
        database: 'cursonestjs',
        synchronize: false,
        entities: [__dirname + '/../**/*.entity.js'],
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'cursonestjs',
  synchronize: false,
  entities: [__dirname + '/../**/*.entity.js'],
  migrations: [CourseRefactoring1657725180075]
});