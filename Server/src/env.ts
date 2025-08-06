import { object, z } from 'zod'

const envSchema = object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
