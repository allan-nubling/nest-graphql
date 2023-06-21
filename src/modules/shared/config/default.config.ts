import { ConstantKeys } from './constant-keys.enum'

export const defaultConfig = () => ({
    [ConstantKeys.env]: process.env[ConstantKeys.env] || 'productions',
    [ConstantKeys.port]: process.env[ConstantKeys.port] || '3333'
})
