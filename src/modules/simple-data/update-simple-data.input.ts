import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateSimpleDataInput {
    @Field(type => String)
    id: string

    @Field(type => String, { nullable: true })
    name: string

    @Field(type => String, { nullable: true })
    gender: string

    @Field(type => String, { nullable: true })
    birthDate: Date
}
