import { Module } from '@nestjs/common'

import { EpisodeResolver } from './episode.resolver'

@Module({ providers: [EpisodeResolver] })
export class EpisodeModule {}
