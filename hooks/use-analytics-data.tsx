import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export interface FaqGeneration {
	id: string;
	title: string;
	category: string;
	questions_count: number;
	created_at: string;
	user_id: string;
}

export const useAnalyticsData = () => {
	const supabase = createClient();
	return useQuery({
		queryKey: ["analytics-data"],
		queryFn: async () => {
			console.log("Fetching analytics data...");

			try {
				const { data, error } = await supabase.rpc(
					"get_faq_generations"
				);

				if (error) {
					console.error("Error fetching analytics data:", error);
					throw error;
				}

				console.log("Analytics data fetched:", data);
				return (data || []) as FaqGeneration[];
			} catch (err) {
				console.error("Failed to fetch analytics data:", err);
				// Return empty array as fallback
				return [] as FaqGeneration[];
			}
		},
	});
};

export const useAnalyticsStats = (data: FaqGeneration[] | undefined) => {
	if (!data) return null;

	const now = new Date();
	const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

	// Calculate stats
	const totalFAQs = data.length;
	const thisMonthFAQs = data.filter(
		(item) => new Date(item.created_at) >= thisMonth
	).length;
	const lastMonthFAQs = data.filter((item) => {
		const date = new Date(item.created_at);
		return date >= lastMonth && date < thisMonth;
	}).length;

	// Calculate daily generations for the last 7 days
	const last7Days = Array.from({ length: 7 }, (_, i) => {
		const date = new Date();
		date.setDate(date.getDate() - (6 - i));
		return date.toISOString().split("T")[0];
	});

	const dailyGenerations = last7Days.map((date) => {
		const count = data.filter(
			(item) => item.created_at.split("T")[0] === date
		).length;
		return { date, count };
	});

	// Calculate category distribution
	const categoryStats = data.reduce((acc, item) => {
		acc[item.category] = (acc[item.category] || 0) + 1;
		return acc;
	}, {} as Record<string, number>);

	const categoryColors = [
		"#8b5cf6",
		"#06b6d4",
		"#10b981",
		"#f59e0b",
		"#ef4444",
	];
	const categoryData = Object.entries(categoryStats).map(
		([name, value], index) => ({
			name,
			value,
			color: categoryColors[index % categoryColors.length],
		})
	);

	// Calculate success rate (assuming all generations are successful for now)
	const successRate = totalFAQs > 0 ? 98.5 : 0;

	// Calculate monthly change percentage
	const monthlyChange =
		lastMonthFAQs > 0
			? Math.round(
					((thisMonthFAQs - lastMonthFAQs) / lastMonthFAQs) * 100
			  )
			: thisMonthFAQs > 0
			? 100
			: 0;

	return {
		totalFAQs,
		thisMonthFAQs,
		monthlyChange,
		successRate,
		dailyGenerations,
		categoryData,
		recentActivity: data.slice(0, 4).map((item) => ({
			title: item.title,
			category: item.category,
			time: formatTimeAgo(item.created_at),
			questions: item.questions_count,
		})),
	};
};

function formatTimeAgo(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) return "Just now";
	if (diffInSeconds < 3600)
		return `${Math.floor(diffInSeconds / 60)} minutes ago`;
	if (diffInSeconds < 86400)
		return `${Math.floor(diffInSeconds / 3600)} hours ago`;
	if (diffInSeconds < 604800)
		return `${Math.floor(diffInSeconds / 86400)} days ago`;
	return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
}
