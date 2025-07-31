import { object, z } from 'zod'

const envSchema = object({
  PORT: z.coerce.number().default(3333),
})

export const env = envSchema.parse(process.env)
