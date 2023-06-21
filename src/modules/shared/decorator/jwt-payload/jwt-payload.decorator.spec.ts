import { ExecutionContext } from '@nestjs/common'

import { createMock } from '@golevelup/ts-jest'
import { IncomingMessage } from 'http'

import { BearerTokenException } from '../../exceptions/bearer-token.exception'
import { DecodeBearerToken } from './jwt-payload.decorator'

describe('DecodeBearerToken', () => {
    const sut = DecodeBearerToken

    const validToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0NTgzZWI1LWJmM2EtNDhkZC1hZDFmLTRkZTJjZDM4M2FkMSIsImlzcyI6Imh0dHBzOi8vYXBpbS1wYXJ0bmVyLWhvbW8uYXp1cmUtYXBpLm5ldC9hdXRoL3BhcnRuZXIvdG9rZW4iLCJzdWIiOiIwOWVhNjdkMy01YzllLTQ2ZmMtYjFhOC1mMWQ0MGMxMDEwZjUiLCJhdWQiOiJQYXJ0bmVyTmFtZSIsInByb2R1Y3QiOjAsInNjb3BlIjoicGFydG5lciIsImlhdCI6MTY2MTUzODk1MCwiZXhwIjoxNjYxNTQyNTUwfQ.oYmuBlXfYjj8W2zH08DG1cKxjKfTK78EBf1ubJIs_oE'

    function makeMockExecutionContext(headers = {}): ExecutionContext {
        return createMock<ExecutionContext>({
            getType: () => 'graphql',
            getArgs: () => [
                undefined,
                {
                    req: createMock<IncomingMessage>({
                        headers
                    })
                },
                {}
            ],
            getClass: () => jest.fn(),
            getHandler: () => jest.fn()
        })
    }
    beforeEach(async () => {
        jest.clearAllMocks()
    })

    it('should be defined', () => {
        expect(sut).toBeDefined()
    })

    describe('execute', () => {
        it('should throw a BearerTokenException if authorization header is missing', async () => {
            const mockExecutionContext = makeMockExecutionContext()
            expect(() => {
                sut(null, mockExecutionContext)
            }).toThrow(BearerTokenException)
        })

        it('should throw a BearerTokenException if authorization header is malformed', async () => {
            const mockExecutionContext = makeMockExecutionContext({
                authorization: validToken
            })

            expect(() => {
                sut(null, mockExecutionContext)
            }).toThrow(BearerTokenException)
        })

        it('should throw a BearerTokenException if authorization header token is invalid', async () => {
            const mockExecutionContext = makeMockExecutionContext({
                authorization: `Bearer invalidtoken`
            })

            expect(() => {
                sut(null, mockExecutionContext)
            }).toThrow(BearerTokenException)
        })

        it('should return full payload of jwt token', async () => {
            const mockExecutionContext = makeMockExecutionContext({
                authorization: `Bearer ${validToken}`
            })

            const payload = sut(null, mockExecutionContext)

            expect(payload).toHaveProperty('iat')
        })

        it('should return selcted property of payload', async () => {
            const mockExecutionContext = makeMockExecutionContext({
                authorization: `Bearer ${validToken}`
            })

            const result = sut('iat', mockExecutionContext)

            expect(result).toBeDefined()
        })
    })
})
