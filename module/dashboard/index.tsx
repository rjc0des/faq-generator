"use client";

import React from "react";
import { Calendar, FileText, TrendingUp, Users, Loader } from "lucide-react";
import {
	useAnalyticsData,
	useAnalyticsStats,
} from "@/hooks/use-analytics-data";
import StatCards from "./StatCards";
import DailyGenerationChart from "./DailyGenerationChart";
import CategoryDistribution from "./CategoryDistribution";
import RecentActivity from "./RecentActivity";

const AnalyticsDashboard = () => {
	const { data: faqData, isLoading, error } = useAnalyticsData();
	const stats = useAnalyticsStats(faqData);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="flex items-center gap-2 text-white">
					<Loader className="h-6 w-6 animate-spin" />
					<span>Loading analytics...</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center text-red-400">
					<p>Error loading analytics data</p>
					<p className="text-sm text-slate-400 mt-2">
						Please try refreshing the page
					</p>
				</div>
			</div>
		);
	}

	if (!stats) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center text-slate-400">
					<FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
					<p>No FAQ generations yet</p>
					<p className="text-sm mt-2">
						Start creating FAQs to see your analytics
					</p>
				</div>
			</div>
		);
	}

	const statCards = [
		{
			title: "Total FAQs Generated",
			value: stats.totalFAQs.toString(),
			change:
				stats.monthlyChange > 0
					? `+${stats.monthlyChange}%`
					: `${stats.monthlyChange}%`,
			icon: FileText,
			color: "text-blue-400",
		},
		{
			title: "This Month",
			value: stats.thisMonthFAQs.toString(),
			change:
				stats.monthlyChange > 0
					? `+${stats.monthlyChange}%`
					: `${stats.monthlyChange}%`,
			icon: Calendar,
			color: "text-green-400",
		},
		{
			title: "Success Rate",
			value: `${stats.successRate}%`,
			change: "+2.1%",
			icon: TrendingUp,
			color: "text-purple-400",
		},
		{
			title: "Categories Used",
			value: stats.categoryData.length.toString(),
			change: `+${stats.categoryData.length}`,
			icon: Users,
			color: "text-cyan-400",
		},
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold text-white">
					Analytics Dashboard
				</h1>
				<p className="text-slate-400">
					Track your FAQ generation activity
				</p>
			</div>

			{/* Stats Grid */}
			<StatCards stats={statCards} />

			{/* Charts Grid */}
			<section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Daily Generation Chart */}
				<DailyGenerationChart
					dailyGenerations={stats.dailyGenerations}
				/>

				{/* Category Distribution */}
				<CategoryDistribution categoryData={stats.categoryData} />
			</section>

			{/* Recent Activity */}
			<RecentActivity recentActivity={stats.recentActivity} />
		</div>
	);
};

export default AnalyticsDashboard;
