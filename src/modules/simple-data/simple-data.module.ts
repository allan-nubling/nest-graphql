import { Module } from '@nestjs/common'

import { SimpleDataRepository } from './services/infra/simple-data.repository'
import { SimpleDataResolver } from './simple-data.resolver'

@Module({ providers: [SimpleDataResolver, SimpleDataRepository] })
export class SimpleDataModule {}
