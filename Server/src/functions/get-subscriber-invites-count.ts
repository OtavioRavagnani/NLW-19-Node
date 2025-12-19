import { redis } from '../redis/client'

interface GetSubscriberInviteCountParams {
    subscriberId: string
}

export async function getSubscriberInvitesCount({
    subscriberId,
}: GetSubscriberInviteCountParams) {
    const count = await redis.zscore('referral:rankin', subscriberId)

    return { count: count ? Number.parseInt(count) : 0 }
}