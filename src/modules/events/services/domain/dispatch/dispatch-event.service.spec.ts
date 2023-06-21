import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { LoggerService } from 'src/modules/shared/services/logger/logger.service'

import { HttpEventData } from 'src/modules/events/interfaces/http-event-data.interface'

import { DispatchEventService } from './dispatch-event.service'
import { LoggerServiceProvider } from 'src/modules/shared/__mocks__/services/logger-service/logger-service.provider'

describe('DispatchEventService', () => {
    let sut: DispatchEventService

    let loggerService: LoggerService

    const input = {
        resource: 'base_test_evenet',
        data: {} as HttpEventData,
        message: 'base event message'
    }

    beforeEach(async () => {
        jest.clearAllMocks()

        const app: TestingModule = await Test.createTestingModule({
            providers: [DispatchEventService, LoggerServiceProvider]
        }).compile()

        sut = app.get<DispatchEventService>(DispatchEventService)
        loggerService = app.get<LoggerService>(LoggerService)
    })

    it('should be defined', () => {
        expect(sut).toBeDefined()
        expect(loggerService).toBeDefined()
    })

    describe('log', () => {
        it('should call dispatch with LOG values', async () => {
            sut.log(input)
            expect(loggerService.log).toBeCalledTimes(1)
            expect(loggerService.log).toHaveBeenCalledWith({
                ...input,
                level: 'LOG'
            })
        })
    })
    describe('error', () => {
        it('should call dispatch with http ERROR values', async () => {
            const error = new NotFoundException()
            sut.error(input, error)
            expect(loggerService.log).toBeCalledTimes(1)
            expect(loggerService.log).toHaveBeenCalledWith({
                ...input,
                level: 'ERROR',
                response: error.getResponse(),
                message: error.message
            })
        })
        it('should call dispatch with ERROR values', async () => {
            const error = new Error()
            sut.error(input, error)
            expect(loggerService.log).toBeCalledTimes(1)
            expect(loggerService.log).toHaveBeenCalledWith({
                ...input,
                level: 'ERROR',
                response: 'server error',
                message: error.message
            })
        })
    })
})
