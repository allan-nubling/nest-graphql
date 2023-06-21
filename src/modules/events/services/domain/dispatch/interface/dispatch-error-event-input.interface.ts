import { EventData } from 'src/modules/events/interfaces/event-data.type'

export interface DispatchErrorEventInput {
    resource: string
    data: EventData
}
