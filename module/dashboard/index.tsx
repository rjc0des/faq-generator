"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import { Calendar, FileText, TrendingUp, Users, Loader } from "lucide-react";
import {
	useAnalyticsData,
	useAnalyticsStats,
} from "@/hooks/use-analytics-data";

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
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{statCards.map((stat, index) => (
					<Card
						key={index}
						className="bg-slate-800/50 border-slate-700"
					>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-slate-400 mb-1">
										{stat.title}
									</p>
									<p className="text-2xl font-bold text-white">
										{stat.value}
									</p>
									<p
										className={`text-sm mt-1 ${
											stat.change.startsWith("+")
												? "text-green-400"
												: stat.change.startsWith("-")
												? "text-red-400"
												: "text-slate-400"
										}`}
									>
										{stat.change}
									</p>
								</div>
								<div
									className={`p-3 rounded-full bg-slate-700 ${stat.color}`}
								>
									<stat.icon className="h-6 w-6" />
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Charts Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Daily Generation Chart */}
				<Card className="bg-slate-800/50 border-slate-700">
					<CardHeader>
						<CardTitle className="text-white">
							Daily FAQ Generation
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<LineChart data={stats.dailyGenerations}>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="#374151"
								/>
								<XAxis dataKey="date" stroke="#9ca3af" />
								<YAxis stroke="#9ca3af" />
								<Tooltip
									contentStyle={{
										backgroundColor: "#1f2937",
										border: "1px solid #374151",
										borderRadius: "8px",
										color: "#ffffff",
									}}
								/>
								<Line
									type="monotone"
									dataKey="count"
									stroke="#8b5cf6"
									strokeWidth={2}
								/>
							</LineChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Category Distribution */}
				<Card className="bg-slate-800/50 border-slate-700">
					<CardHeader>
						<CardTitle className="text-white">
							FAQ Categories
						</CardTitle>
					</CardHeader>
					<CardContent>
						{stats.categoryData.length > 0 ? (
							<>
								<ResponsiveContainer width="100%" height={300}>
									<PieChart>
										<Pie
											data={stats.categoryData}
											cx="50%"
											cy="50%"
											innerRadius={60}
											outerRadius={100}
											paddingAngle={5}
											dataKey="value"
										>
											{stats.categoryData.map(
												(entry, index) => (
													<Cell
														key={`cell-${index}`}
														fill={entry.color}
													/>
												)
											)}
										</Pie>
										<Tooltip
											contentStyle={{
												backgroundColor: "#1f2937",
												border: "1px solid #374151",
												borderRadius: "8px",
												color: "#ffffff",
											}}
										/>
									</PieChart>
								</ResponsiveContainer>
								<div className="flex flex-wrap gap-4 mt-4">
									{stats.categoryData.map(
										(category, index) => (
											<div
												key={index}
												className="flex items-center gap-2"
											>
												<div
													className="w-3 h-3 rounded-full"
													style={{
														backgroundColor:
															category.color,
													}}
												/>
												<span className="text-sm text-slate-300">
													{category.name}
												</span>
											</div>
										)
									)}
								</div>
							</>
						) : (
							<div className="flex items-center justify-center h-[300px] text-slate-400">
								<p>No categories to display</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Recent Activity */}
			<Card className="bg-slate-800/50 border-slate-700">
				<CardHeader>
					<CardTitle className="text-white">
						Recent FAQ Generations
					</CardTitle>
				</CardHeader>
				<CardContent>
					{stats.recentActivity.length > 0 ? (
						<div className="space-y-4">
							{stats.recentActivity.map((item, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
								>
									<div>
										<h4 className="text-white font-medium">
											{item.title}
										</h4>
										<p className="text-sm text-slate-400">
											{item.category} • {item.questions}{" "}
											questions
										</p>
									</div>
									<span className="text-sm text-slate-400">
										{item.time}
									</span>
								</div>
							))}
						</div>
					) : (
						<div className="flex items-center justify-center py-8 text-slate-400">
							<p>No recent activity to display</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default AnalyticsDashboard;
