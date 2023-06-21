import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { ConstantKeys } from './modules/shared/config/constant-keys.enum'
import { LoggerService } from './modules/shared/services/logger/logger.service'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const apiLogger = await app.resolve(LoggerService)
    apiLogger.setContext('Server')
    app.useLogger(apiLogger)

    const port = app.get(ConstantKeys.port)
    await app.listen(port, () => {
        apiLogger.log(`Running on PORT ${port}`)
    })
}
bootstrap()
