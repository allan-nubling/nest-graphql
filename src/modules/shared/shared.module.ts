import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'

import { SecretsProviders } from './providers/secrets.provider'
import { HttpClientService } from './services/http-client/http-client.service'
import { LoggerService } from './services/logger/logger.service'
import { SecretService } from './services/secret/secret.service'

const SharedServices = [
    ...SecretsProviders,
    HttpClientService,
    LoggerService,
    SecretService
]
@Global()
@Module({
    imports: [HttpModule],
    providers: [...SharedServices],
    exports: [...SharedServices]
})
export class SharedModule {}
