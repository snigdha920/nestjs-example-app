import { Module } from '@nestjs/common';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import {
  ReflectMetadataProvider,
  type Connection,
  type IDatabaseDriver,
} from '@mikro-orm/core';
import { Author, BaseEntity, Book, BookTag, Publisher } from '../../entities';
// import { MongoDriver } from '@mikro-orm/mongodb';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import path from 'node:path';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => {
        const databaseConfig = {
          type: 'postgresql',
          dbName: 'test',
          host: 'localhost',
          port: 5432,
        };
        const baseMikroConfig: Omit<
          MikroOrmModuleOptions<IDatabaseDriver<Connection>>,
          'contextName'
        > = {
          driver: PostgreSqlDriver,
          implicitTransactions: false,
          validate: true,
          strict: true,
          populateAfterFlush: true,
          autoLoadEntities: false,
          metadataProvider: ReflectMetadataProvider,
          entities: [Author, Book, BookTag, Publisher, BaseEntity],
          registerRequestContext: false,
          dbName: databaseConfig.dbName,
        };

        return {
          ...baseMikroConfig,
          host: databaseConfig.host,
          port: databaseConfig.port,
          migrations: {
            tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
            path: path.join(__dirname, './migrations'), // path to the folder with migrations
            pathTs: undefined, // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
            glob: '!(*.d).{ts,js}', // how to match migration files (all .js and .ts files, but not .d.ts)
            transactional: true, // wrap each migration in a transaction
            disableForeignKeys: false, // wrap statements with `set foreign_key_checks = 0` or equivalent
            allOrNothing: true, // wrap all migrations in master transaction
            // do not change this, it will delete the keycloak tables!
            dropTables: false, // explicitly disable table dropping in production
            safe: true, // explicitly enable safe mode in production
            snapshot: true, // save snapshot when creating new migrations
            emit: 'js', // migration generation mode
          },
        };
      },
    }),
    MikroOrmModule.forFeature({
      entities: [Author, Book, BookTag, Publisher],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
