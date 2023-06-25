import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { join } from 'path'

import { CharacterModule } from './modules/character/character.module'
import { EpisodeModule } from './modules/episode/episode.module'
import { EventsModule } from './modules/events/events.module'
import { defaultConfig } from './modules/shared/config/default.config'
import { SharedModule } from './modules/shared/shared.module'
import { SimpleDataModule } from './modules/simple-data/simple-data.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [defaultConfig]
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            debug: true,
            playground: true
        }),
        CharacterModule,
        EpisodeModule,
        SimpleDataModule,
        SharedModule,
        EventsModule
    ]
})
export class AppModule {}
