import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscribers } from '../functions/get-subscribers'

export const getSubscribersRoute: FastifyPluginAsyncZod =
    async app => {
        app.get(
            '/subscribers',
            {
                schema: {
                    summary: 'Get all subscribers',
                    tags: ['subscription'],
                    response: {
                        200: z.object({
                            subscribers: z.array(
                                z.object({
                                    id: z.string(),
                                    name: z.string(),
                                    email: z.string(),
                                    phone: z.string(),
                                })
                            ),
                        }),
                    },
                },
            },
            async (request, reply) => {
                const { subscribers } = await getSubscribers()

                return reply.status(200).send({ subscribers })
            }
        )
    }
