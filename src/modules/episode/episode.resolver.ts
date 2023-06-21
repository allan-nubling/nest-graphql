import { Query, Resolver, Args, Mutation } from '@nestjs/graphql'

import { Headers } from '../shared/decorator/headers.decorator'
import { HttpClientService } from '../shared/services/http-client/http-client.service'
import {
    EpisodeResponseDTO,
    ListEpisodeResponseDTO
} from './episode-response.dto'
import { Episode } from './episode.model'

@Resolver(_of => Episode)
export class EpisodeResolver {
    constructor(private readonly httpClient: HttpClientService) {}

    @Query(_returns => [Episode])
    async episode(@Headers() headers) {
        const res = await this.httpClient.get<ListEpisodeResponseDTO>(
            'https://rickandmortyapi.com/api/episode',
            { headers }
        )
        return res.results
    }

    @Query(_returns => Episode)
    async episodeById(@Args('id') id: number, @Headers() headers) {
        const res = await this.httpClient.get<EpisodeResponseDTO>(
            `https://rickandmortyapi.com/api/episode/${id}`,
            { headers }
        )
        return res
    }

    @Mutation(_returns => Episode)
    async updateEpisodeById(@Args('id') id: number, @Headers() headers) {
        const res = await this.httpClient.get<EpisodeResponseDTO>(
            `https://rickandmortyapi.com/api/episode/${id}`,
            { headers }
        )
        return res
    }
}
