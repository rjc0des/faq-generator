import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";
import React from "react";
import { Cell, Pie, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
	categoryData: {
		name: string;
		value: number;
		color: string;
	}[];
};

function CategoryDistribution({ categoryData }: Props) {
	return (
		<Card className="bg-slate-800/50 border-slate-700">
			<CardHeader>
				<CardTitle className="text-white">FAQ Categories</CardTitle>
			</CardHeader>
			<CardContent>
				{categoryData.length > 0 ? (
					<>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={categoryData}
									cx="50%"
									cy="50%"
									innerRadius={60}
									outerRadius={100}
									paddingAngle={5}
									dataKey="value"
								>
									{categoryData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={entry.color}
										/>
									))}
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
							{categoryData.map((category, index) => (
								<div
									key={index}
									className="flex items-center gap-2"
								>
									<div
										className="w-3 h-3 rounded-full"
										style={{
											backgroundColor: category.color,
										}}
									/>
									<span className="text-sm text-slate-300">
										{category.name}
									</span>
								</div>
							))}
						</div>
					</>
				) : (
					<div className="flex items-center justify-center h-[300px] text-slate-400">
						<p>No categories to display</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export default CategoryDistribution;
