import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { ConstantKeys } from '../../config/constant-keys.enum'
import { EnvironmentVariables } from '../../config/environment-variables.type'
import { LoggerService } from '../logger/logger.service'

@Injectable()
export class SecretService {
    private readonly memoization = new Map<ConstantKeys, string>()
    constructor(
        private readonly config: ConfigService<EnvironmentVariables>,
        private loggerService: LoggerService
    ) {
        this.loggerService.setContext(SecretService.name)
    }

    async fetchEnvSecret(key: ConstantKeys): Promise<string> {
        const secret = this.config.get(key)

        if (typeof secret === 'undefined') {
            this.loggerService.warn(`${key} not resolved`)
            return ''
        }

        this.loggerService.log(`${key} resolved`)
        return secret
    }
}
