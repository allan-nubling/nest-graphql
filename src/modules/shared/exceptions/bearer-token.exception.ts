import { UnauthorizedException } from '@nestjs/common'

export class BearerTokenException extends UnauthorizedException {
    constructor() {
        super(
            'Invalid Bearer token, verify authorization header',
            BearerTokenException.name
        )
    }
}
