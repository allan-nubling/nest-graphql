import { EventType } from '../enum/event-type.enum'

export interface MessageEventData {
    type: EventType.message
    body: object
    context: {
        messageId: string
        deliveryCount: number
        enqueuedTimeUtc: string
    }
}
