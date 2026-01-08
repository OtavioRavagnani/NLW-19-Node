ALTER TABLE "subscriptions" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "phone" text NOT NULL;