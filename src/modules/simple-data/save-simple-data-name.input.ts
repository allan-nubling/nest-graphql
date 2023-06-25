import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SaveSimpleDataInput {
    @Field(type => String)
    id: string

    @Field(type => String)
    name: string
}
