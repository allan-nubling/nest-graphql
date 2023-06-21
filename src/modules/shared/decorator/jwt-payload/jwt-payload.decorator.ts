import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import jwtDecode from 'jwt-decode'

import { BearerTokenException } from '../../exceptions/bearer-token.exception'

export const DecodeBearerToken = (
    property: string,
    ctx: ExecutionContext
): unknown => {
    const authorization =
        GqlExecutionContext.create(ctx).getContext().req.headers[
            'authorization'
        ]
    if (!authorization) throw new BearerTokenException()

    const [token] = authorization.match(/(?<=(^Bearer\s)).+/gi) || [null]
    if (!token) throw new BearerTokenException()

    try {
        const payload = jwtDecode(token)
        return property ? payload[property] : payload
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log({ jwtDecodeError: err })
        throw new BearerTokenException()
    }
}
export const JwtPayload = createParamDecorator(DecodeBearerToken)
