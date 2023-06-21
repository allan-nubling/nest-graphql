import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const Headers = createParamDecorator(
    (
        keys: string[] = ['Authorization'],
        ctx: ExecutionContext
    ): Record<string, string> => {
        const { headers } = GqlExecutionContext.create(ctx).getContext().req
        return keys
            .map(key => key.toLowerCase())
            .reduce((agg, key) => {
                const value = headers[key]
                return { ...agg, ...(value && { [key]: value }) }
            }, {})
    }
)
