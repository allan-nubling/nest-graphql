import { EventData } from 'src/modules/events/interfaces/event-data.type'

export interface DispatchLogEventInput {
    resource: string
    data: EventData
    response?: unknown
    message: string
}
