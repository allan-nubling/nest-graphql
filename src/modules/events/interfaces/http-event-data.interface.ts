import { EventType } from '../enum/event-type.enum'

export interface HttpEventData {
    type: EventType
    authorization?: object
    params?: object
    headers?: object
    body?: object
}
