export class EpisodeResponseDTO {
    id: number

    name: string

    air_date: string

    episode: string

    url: string

    created: string
}

export class ListEpisodeResponseDTO {
    results: EpisodeResponseDTO[]
}
