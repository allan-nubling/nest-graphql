import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CharacterInput {
    @Field(type => String, { nullable: true })
    name?: string

    @Field(type => String, { nullable: true })
    status?: string

    @Field(type => String, { nullable: true })
    species?: string

    @Field(type => String, { nullable: true })
    type?: string

    @Field(type => String, { nullable: true })
    gender?: string
}
