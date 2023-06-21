import { Field, ID, ObjectType } from '@nestjs/graphql'

// import { Character } from '../character/character.model'

@ObjectType()
export class Episode {
    @Field(type => ID)
    id: number

    @Field(type => String)
    name: string

    @Field(type => String)
    air_date: string

    @Field(type => String)
    episode: string

    // @Field(type => [Character])
    // characters: Character[]

    @Field(type => String)
    url: string

    @Field(type => String)
    created: string
}
