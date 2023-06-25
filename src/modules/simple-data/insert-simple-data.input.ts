import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class InsertSimpleDataInput {
    @Field(type => String)
    name: string

    @Field(type => String)
    gender: string

    @Field(type => String)
    birthDate: Date
}
