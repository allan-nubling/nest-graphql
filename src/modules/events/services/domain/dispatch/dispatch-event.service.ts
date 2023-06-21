import { HttpException, Injectable } from '@nestjs/common'

import { LoggerService } from 'src/modules/shared/services/logger/logger.service'

import { DispatchErrorEventInput } from './interface/dispatch-error-event-input.interface'
import { DispatchEventInput } from './interface/dispatch-event-input.interface'
import { DispatchLogEventInput } from './interface/dispatch-log-event-input.interface'

@Injectable()
export class DispatchEventService {
    constructor(private readonly loggerService: LoggerService) {
        this.loggerService.setContext(DispatchEventService.name)
    }

    protected dispatch(input: DispatchEventInput): void {
        // TODO: should add a event client here to grab this events
        this.loggerService.log({
            ...input,
            ...(input.response && { response: input.response })
        })
    }

    log(input: DispatchLogEventInput): void {
        this.dispatch({ ...input, level: 'LOG' })
    }

    error(input: DispatchErrorEventInput, err: HttpException | Error): void {
        this.dispatch({
            ...input,
            level: 'ERROR',
            message: err.message,
            response:
                err instanceof HttpException
                    ? err.getResponse()
                    : 'server error'
        })
    }
}
