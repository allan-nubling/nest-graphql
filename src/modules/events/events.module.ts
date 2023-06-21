import { Global, Module } from '@nestjs/common'

import { DispatchEventService } from './services/domain/dispatch/dispatch-event.service'

const DomainServices = [DispatchEventService]

@Global()
@Module({
    providers: [...DomainServices],
    exports: [...DomainServices]
})
export class EventsModule {}
