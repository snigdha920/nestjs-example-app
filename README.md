# Reproduce nestjs cannot find `MongoMikroORM` 

1. Install dependencies via `yarn install` 
2. Run `docker-compose up -d` to start postgres and mongodb
3. Run via `yarn start:dev` (nodemon)
4. We see the error: 

```bash
yarn start:dev
yarn run v1.22.22
$ nodemon
[nodemon] 3.0.3
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: ts
[nodemon] starting `ts-node -r tsconfig-paths/register src/main.ts`
[Nest] 12276  - 05/21/2024, 2:26:56 PM     LOG [NestFactory] Starting Nest application...
[Nest] 12276  - 05/21/2024, 2:26:56 PM   ERROR [ExceptionHandler] Nest cannot export a provider/module that is not a part of the currently processed module (MikroOrmCoreModule). Please verify whether the exported MongoMikroORM is available in this particular context.

Possible Solutions:
- Is MongoMikroORM part of the relevant providers/imports within MikroOrmCoreModule?

Error: Nest cannot export a provider/module that is not a part of the currently processed module (MikroOrmCoreModule). Please verify whether the exported MongoMikroORM is available in this particular context.

Possible Solutions:
- Is MongoMikroORM part of the relevant providers/imports within MikroOrmCoreModule?

    at Module.validateExportedProvider (/Users/snigdhasingh/Development/nestjs-example-app/node_modules/@nestjs/core/injector/module.js:308:19)
    at addExportedUnit (/Users/snigdhasingh/Development/nestjs-example-app/node_modules/@nestjs/core/injector/module.js:276:67)
    at Module.addExportedProvider (/Users/snigdhasingh/Development/nestjs-example-app/node_modules/@nestjs/core/injector/module.js:287:9)
    at NestContainer.addExportedProvider (/Users/snigdhasingh/Development/nestjs-example-app/node_modules/@nestjs/core/injector/container.js:168:19)
    at DependenciesScanner.insertExportedProvider (/Users/snigdhasingh/Development/nestjs-example-app/node_modules/@nestjs/core/scanner.js:291:24)
    at /Users/snigdhasingh/Development/nestjs-example-app/node_modules/@nestjs/core/scanner.js:148:50
    at Array.forEach (<anonymous>)
    at DependenciesScanner.reflectExports (/Users/snigdhasingh/Development/nestjs-example-app/node_modules/@nestjs/core/scanner.js:148:17)
    at DependenciesScanner.scanModulesForDependencies (/Users/snigdhasingh/Development/nestjs-example-app/node_modules/@nestjs/core/scanner.js:101:18)
    at async DependenciesScanner.scan (/Users/snigdhasingh/Development/nestjs-example-app/node_modules/@nestjs/core/scanner.js:31:9)
[nodemon] app crashed - waiting for file changes before starting...

```

6. Comment the `migrations` field in the src/modules/orm/orm.module.ts file, the error goes away

I have a NestJS application where I want to connect to either postgres or mongodb depending on the configuration provided. It has been failing since @mikro-orm/nestjs v6.0.0 with the same error above. 
