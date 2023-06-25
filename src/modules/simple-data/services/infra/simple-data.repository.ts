import { Injectable } from '@nestjs/common'

import { Config, JsonDB } from 'node-json-db'
import { v4 as uuid } from 'uuid'

import { SimpleData } from '../../simple-data.model'

@Injectable()
export class SimpleDataRepository {
    private readonly db = new JsonDB(new Config('simple-data', true, true))

    async insert(input: Omit<SimpleData, 'id'>) {
        const id = uuid()
        await this.db.push(`/${id}`, input, true)
        return { ...input, id }
    }

    async update({ id, ...data }: SimpleData) {
        await this.db.push(`/${id}`, data, false)
        const updated = await this.db.getData(`/${id}`)
        return { ...updated, id }
    }

    async list(): Promise<SimpleData[]> {
        const data = await this.db.getData('/')
        return Object.entries(data).map(
            ([key, values]: [string, Omit<SimpleData, 'id'>]) => ({
                ...values,
                id: key
            })
        )
    }

    async get(id: string): Promise<SimpleData[]> {
        const data = await this.db.getData(`/${id}`)
        return { ...data, id }
    }
}
