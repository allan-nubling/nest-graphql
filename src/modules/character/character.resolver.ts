import {
    Query,
    Resolver,
    Args,
    Mutation,
    ResolveProperty,
    Parent
} from '@nestjs/graphql'

import { Episode } from '../episode/episode.model'
import { Headers } from '../shared/decorator/headers.decorator'
import { HttpClientService } from '../shared/services/http-client/http-client.service'
import {
    CharacterResponseDTO,
    ListCharacterResponseDTO
} from './character-response.dto'
import { CharacterInput } from './character.input'
import { Character } from './character.model'

@Resolver(_of => Character)
export class CharacterResolver {
    constructor(private readonly httpClient: HttpClientService) {}

    @Query(_returns => [Character])
    async character(@Headers() headers) {
        const res = await this.httpClient.get<ListCharacterResponseDTO>(
            'https://rickandmortyapi.com/api/character',
            { headers }
        )
        return res.results
    }

    @Query(_returns => Character)
    async characterById(@Args('id') id: number, @Headers() headers) {
        const res = await this.httpClient.get<CharacterResponseDTO>(
            `https://rickandmortyapi.com/api/character/${id}`,
            { headers }
        )
        return res
    }

    @Mutation(_returns => Character)
    async updateCharacterById(
        @Args('id') id: number,
        @Args('data', { nullable: true }) data?: CharacterInput
    ) {
        console.log({ data })
        const res = await this.httpClient.get<CharacterResponseDTO>(
            `https://rickandmortyapi.com/api/character/${id}`
        )
        return res
    }

    @ResolveProperty(() => [Episode], { name: 'episode' })
    async findEpisodeByURL(@Parent() parent: CharacterResponseDTO) {
        return this.httpClient.get(
            'https://rickandmortyapi.com/api/episode/' +
                parent.episode
                    .map(url =>
                        url.replace(
                            'https://rickandmortyapi.com/api/episode/',
                            ''
                        )
                    )
                    .join(',')
        )
    }
}
