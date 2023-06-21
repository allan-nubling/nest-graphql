import { EventData } from 'src/modules/events/interfaces/event-data.type'

export interface DispatchEventInput {
    resource: string
    data: EventData
    message: string
    response?: unknown
    level: 'LOG' | 'ERROR'
}
