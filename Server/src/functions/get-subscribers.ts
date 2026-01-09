import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";

export async function getSubscribers() {
    const subscribers = await db
        .select()
        .from(subscriptions);

    return { subscribers }
};