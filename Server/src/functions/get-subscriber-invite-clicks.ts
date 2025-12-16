import { redis } from '../redis/client'

interface GetSubscriberInviteClickParams {
    subscriberId: string
}

export async function getSubscriberInvitesClicks({
    subscriberId,
}: GetSubscriberInviteClickParams) {
    //await redis.hincrby('referral:access-count', subscriberId, 1)

    const count = await redis.hget('refarral:access-count', subscriberId)

    return { count: count ? Number.parseInt(count) : 0 }
}