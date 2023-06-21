import { Field, ID, ObjectType } from '@nestjs/graphql'

import { Episode } from '../episode/episode.model'

@ObjectType()
export class Character {
    @Field(type => ID)
    id: number

    @Field(type => String)
    name: string

    @Field(type => String)
    status: string

    @Field(type => String)
    species: string

    @Field(type => String)
    type: string

    @Field(type => String)
    gender: string

    @Field(type => String)
    image: string

    @Field(type => [Episode])
    episode: Promise<Episode[]>

    @Field(type => String)
    url: string

    @Field(type => String)
    created: string
}
