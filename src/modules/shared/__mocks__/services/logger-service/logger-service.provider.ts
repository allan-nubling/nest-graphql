import { LoggerService } from 'src/modules/shared/services/logger/logger.service'

export const LoggerServiceProvider = {
    provide: LoggerService,
    useValue: {
        setContext: jest.fn(),
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
        verbose: jest.fn()
    }
}
