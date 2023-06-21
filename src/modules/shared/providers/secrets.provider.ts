import { FactoryProvider } from '@nestjs/common'

import { ConstantKeys } from '../config/constant-keys.enum'
import { SecretService } from '../services/secret/secret.service'

export const SecretsProviders: FactoryProvider[] = Object.values(
    ConstantKeys
).map((key: ConstantKeys): FactoryProvider => {
    return {
        inject: [SecretService],
        provide: key,
        useFactory: async (secretService: SecretService): Promise<string> => {
            return secretService.fetchEnvSecret(key)
        }
    }
})
