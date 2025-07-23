"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Subscription {
	id: string;
	user_id: string;
	lemon_squeezy_customer_id: string | null;
	lemon_squeezy_subscription_id: string | null;
	status: string;
	plan_name: string | null;
	plan_price: number | null;
	billing_cycle: string | null;
	current_period_start: string | null;
	current_period_end: string | null;
	trial_end: string | null;
	created_at: string;
	updated_at: string;
}

export const useSubscription = () => {
	const supabase = createClient();
	const [subscription, setSubscription] = useState<Subscription | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchSubscription = async () => {
		try {
			setLoading(true);
			setError(null);

			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				setSubscription(null);
				return;
			}

			const { data, error: fetchError } = await supabase
				.from("subscriptions")
				.select("*")
				.eq("user_id", user.id)
				.eq("status", "active")
				.maybeSingle();

			if (fetchError) {
				throw fetchError;
			}

			setSubscription(data);
		} catch (err) {
			const errorMessage =
				err instanceof Error
					? err.message
					: "Failed to fetch subscription";
			setError(errorMessage);
			console.error("Error fetching subscription:", err);
		} finally {
			setLoading(false);
		}
	};

	const isSubscribed = (planName?: string) => {
		if (!subscription || subscription.status !== "active") {
			return false;
		}

		if (planName) {
			return (
				subscription.plan_name?.toLowerCase() === planName.toLowerCase()
			);
		}

		return true;
	};

	const canAccessFeature = (requiredPlan: "free" | "pro" | "enterprise") => {
		if (requiredPlan === "free") {
			return true;
		}

		if (!subscription || subscription.status !== "active") {
			return false;
		}

		const planHierarchy = { free: 0, pro: 1, enterprise: 2 };
		const currentPlanLevel =
			planHierarchy[
				subscription.plan_name?.toLowerCase() as keyof typeof planHierarchy
			] ?? 0;
		const requiredPlanLevel = planHierarchy[requiredPlan];

		return currentPlanLevel >= requiredPlanLevel;
	};

	useEffect(() => {
		fetchSubscription();

		// Listen for auth changes
		const {
			data: { subscription: authSub },
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
				fetchSubscription();
			} else if (event === "SIGNED_OUT") {
				setSubscription(null);
				setLoading(false);
			}
		});

		return () => authSub.unsubscribe();
	}, []);

	return {
		subscription,
		loading,
		error,
		isSubscribed,
		canAccessFeature,
		refetch: fetchSubscription,
	};
};
