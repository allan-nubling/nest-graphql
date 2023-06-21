import { DispatchEventService } from '../../services/domain/dispatch/dispatch-event.service'

export const DispatchEventServiceProvider = {
    provide: DispatchEventService,
    useValue: {
        log: jest.fn(),
        error: jest.fn()
    }
}
