"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useSubscription } from "@/hooks/use-subscription";

interface MonthlyUsage {
	id: string;
	user_id: string;
	year: number;
	month: number;
	faq_generations_count: number;
	created_at: string;
	updated_at: string;
}

export const useMonthlyUsage = () => {
	const supabase = createClient();
	const [monthlyUsage, setMonthlyUsage] = useState<MonthlyUsage | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { subscription, canAccessFeature } = useSubscription();

	const MONTHLY_LIMITS = {
		free: 3,
		pro: 30,
		enterprise: 30,
	};

	const fetchMonthlyUsage = async () => {
		try {
			setLoading(true);
			setError(null);

			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				setMonthlyUsage(null);
				return;
			}

			const now = new Date();
			const currentYear = now.getFullYear();
			const currentMonth = now.getMonth() + 1;

			const { data, error: fetchError } = await supabase
				.from("monthly_usage")
				.select("*")
				.eq("user_id", user.id)
				.eq("year", currentYear)
				.eq("month", currentMonth)
				.maybeSingle();

			if (fetchError) {
				throw fetchError;
			}

			setMonthlyUsage(data);
		} catch (err) {
			const errorMessage =
				err instanceof Error
					? err.message
					: "Failed to fetch monthly usage";
			setError(errorMessage);
			console.error("Error fetching monthly usage:", err);
		} finally {
			setLoading(false);
		}
	};

	const incrementUsage = async () => {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				throw new Error("User not authenticated");
			}

			const now = new Date();
			const currentYear = now.getFullYear();
			const currentMonth = now.getMonth() + 1;

			// Try to insert or update monthly usage
			const { data, error } = await supabase
				.from("monthly_usage")
				.upsert(
					{
						user_id: user.id,
						year: currentYear,
						month: currentMonth,
						faq_generations_count:
							(monthlyUsage?.faq_generations_count || 0) + 1,
					},
					{
						onConflict: "user_id,year,month",
					}
				)
				.select()
				.single();

			if (error) {
				throw error;
			}

			setMonthlyUsage(data);
			return data;
		} catch (err) {
			console.error("Error incrementing usage:", err);
			throw err;
		}
	};

	const getRemainingGenerations = () => {
		const currentUsage = monthlyUsage?.faq_generations_count || 0;

		if (canAccessFeature("pro")) {
			return MONTHLY_LIMITS.pro - currentUsage;
		}

		return MONTHLY_LIMITS.free - currentUsage;
	};

	const canGenerate = () => {
		const remaining = getRemainingGenerations();
		return remaining > 0;
	};

	const getMonthlyLimit = () => {
		if (canAccessFeature("pro")) {
			return MONTHLY_LIMITS.pro;
		}

		return MONTHLY_LIMITS.free;
	};

	const getCurrentUsage = () => {
		return monthlyUsage?.faq_generations_count || 0;
	};

	useEffect(() => {
		fetchMonthlyUsage();

		// Listen for auth changes
		const {
			data: { subscription: authSub },
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
				fetchMonthlyUsage();
			} else if (event === "SIGNED_OUT") {
				setMonthlyUsage(null);
				setLoading(false);
			}
		});

		return () => authSub.unsubscribe();
	}, []);

	return {
		monthlyUsage,
		loading,
		error,
		getRemainingGenerations,
		canGenerate,
		getMonthlyLimit,
		getCurrentUsage,
		incrementUsage,
		refetch: fetchMonthlyUsage,
	};
};
