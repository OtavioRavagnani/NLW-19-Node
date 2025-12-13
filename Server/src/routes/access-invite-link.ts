import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'

export const accessToInviteLinkRoute: FastifyPluginAsyncZod = async app => {

    app.get(
        '/invite/:subscriberId',
        {
            schema: {
                summary: 'Access invite link and redirects user',
                tags: ['refarral'],
                params: z.object({
                    subscriberId: z.string(),
                }),
                response: {
                    201: z.object({
                        subscriberId: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const { subscriberId } = request.params

            await accessInviteLink({ subscriberId })

            const redirectUrl = new URL(env.WEB_URL!)

            redirectUrl.searchParams.set('referrer', subscriberId)

            return reply.redirect(redirectUrl.toString(), 302)
        }
    )
}
