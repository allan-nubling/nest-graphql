import { Query, Resolver, Args, Mutation } from '@nestjs/graphql'

import { InsertSimpleDataInput } from './insert-simple-data.input'
import { SimpleDataRepository } from './services/infra/simple-data.repository'
import { SimpleData } from './simple-data.model'
import { UpdateSimpleDataInput } from './update-simple-data.input'

@Resolver(_of => SimpleData)
export class SimpleDataResolver {
    constructor(private readonly simpleDataRepository: SimpleDataRepository) {}

    @Mutation(_returns => SimpleData)
    async insertSimpleData(
        @Args('data', { type: () => InsertSimpleDataInput })
        data: InsertSimpleDataInput
    ) {
        return this.simpleDataRepository.insert(data)
    }

    @Mutation(_returns => SimpleData)
    async updateSimpleData(
        @Args('data', { type: () => UpdateSimpleDataInput })
        data: UpdateSimpleDataInput
    ) {
        return this.simpleDataRepository.update(data)
    }

    @Query(_returns => [SimpleData])
    async listSimpleData() {
        return this.simpleDataRepository.list()
    }

    @Query(_returns => SimpleData)
    async getSimpleData(@Args('id', { type: () => String }) id: string) {
        return this.simpleDataRepository.get(id)
    }
}
