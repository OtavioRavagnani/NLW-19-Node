import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'subscribe someone to event',
        tags: ['subscription'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string().regex(/^\d{10,11}$/, "Telefone inválido. Use DDD + Número (apenas números)"),
          referrer: z.string().nullish(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
            mensage: z.string()
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, referrer, phone } = request.body

      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        phone,
        referrerId: referrer,
      })

      return reply.status(201).send({
        subscriberId,
        mensage: "inscrito com sucesso"
      })
    }
  )
}
