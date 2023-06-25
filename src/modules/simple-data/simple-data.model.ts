import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SimpleData {
    @Field(type => String)
    id: string

    @Field(type => String)
    name: string

    @Field(type => String)
    gender: string

    @Field(type => String)
    birthDate: Date
}
