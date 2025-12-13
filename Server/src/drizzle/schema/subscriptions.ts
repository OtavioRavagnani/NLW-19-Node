import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const subscriptions = pgTable("subscriptions", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').unique(),
    created_at: timestamp('created_at').notNull().defaultNow(),
})