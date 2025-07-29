import { createClient } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

const supabase = createClient();
const supabase1 = createClient();
export async function POST(request: NextRequest) {
	try {
		console.log(request);
		
		const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET as string;
		// Raw body required for signature verification
		const rawBody = await request.text();
		const signature = request.headers.get("X-Signature") || "";

		// Verify signature
		const expectedSignature = crypto
			.createHmac("sha256", secret)
			.update(rawBody)
			.digest("hex");

		if (signature !== expectedSignature) {
			return NextResponse.json(
				{ error: "Invalid signature" },
				{ status: 400 }
			);
		}

		const payload = JSON.parse(rawBody);

		const eventName = payload.meta.event_name;

		const subscriptionData = { ...payload.data, meta: payload.meta };

		console.log(`Processing webhook event: ${eventName}`);

		switch (eventName) {
			case "subscription_created":
			case "subscription_updated":
				await handleSubscriptionUpdate(supabase, subscriptionData);
				break;
			case "subscription_cancelled":
			case "subscription_expired":
				await handleSubscriptionCancellation(
					supabase,
					subscriptionData
				);
				break;
			default:
				console.log(`Unhandled event: ${eventName}`);
		}
		return NextResponse.json({ received: true }, { status: 200 });
	} catch (err) {
		console.log(err);

		return NextResponse.json(
			{ error: JSON.stringify({ err }) },
			{
				status: 500,
			}
		);
	}
}

interface SubscriptionData {
	id: string;
	meta: {
		custom_data: {
			user_id: string;
		};
	};
	attributes: {
		customer_id: number;
		status: string;
		product_name: string;
		billing_anchor: number;
		created_at: string;
		renews_at: string;
		trial_ends_at: string;
	};
}

enum Status {
	pending = "pending",
	active = "active",
	past_due = "past_due",
	canceled = "canceled",
	expired = "expired",
}

interface SubscriptionUpdate {
	user_id: string;
	lemon_squeezy_subscription_id: string;
	lemon_squeezy_customer_id: string;
	status: Status;
	plan_name: "pro plan" | "free plan";
	plan_price: number;
	billing_cycle: string;
	current_period_start: string;
	current_period_end: string;
	trial_end: string | null;
}

async function handleSubscriptionUpdate(
	supabase: typeof supabase1,
	subscriptionData: SubscriptionData
) {
	// console.log(await supabase);

	const userId = subscriptionData.meta.custom_data.user_id;

	if (!userId) {
		throw new Error("No user_id found in subscription data");
	}

	const subscriptionUpdate: SubscriptionUpdate = {
		user_id: userId,
		lemon_squeezy_subscription_id: subscriptionData.id,
		lemon_squeezy_customer_id: subscriptionData.attributes.customer_id + "",
		status: Status[
			subscriptionData.attributes.status as keyof typeof Status
		],
		plan_name:
			subscriptionData.attributes.product_name.toLocaleLowerCase() as SubscriptionUpdate["plan_name"],
		plan_price: 1999,
		billing_cycle: "monthly",
		current_period_start: new Date(
			subscriptionData.attributes.created_at
		).toISOString(),
		current_period_end: new Date(
			subscriptionData.attributes.renews_at
		).toISOString(),
		trial_end: subscriptionData.attributes.trial_ends_at
			? new Date(subscriptionData.attributes.trial_ends_at).toISOString()
			: null,
	};

	console.log(subscriptionUpdate);
	const { user_id, ...restData } = subscriptionUpdate;

	const { error, count } = await supabase
		.from("subscriptions")
		.update(restData)
		.eq("user_id", user_id);
	// .upsert(subscriptionUpdate, {
	// 	onConflict: "lemon_squeezy_subscription_id",
	// 	ignoreDuplicates: false,
	// });

	const hello = await supabase.from("subscriptions").select("*");

	console.log(hello);

	if (error) {
		throw error;
	}
}

async function handleSubscriptionCancellation(
	supabase: any,
	subscriptionData: any
) {
	const { error } = await supabase
		.from("subscriptions")
		.update({
			status: subscriptionData.attributes.status,
			updated_at: new Date().toISOString(),
		})
		.eq("lemon_squeezy_subscription_id", subscriptionData.id);

	if (error) {
		throw error;
	}
}
