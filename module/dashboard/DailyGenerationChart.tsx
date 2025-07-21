import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

type Props = {
	dailyGenerations: {
		date: string;
		count: number;
	}[];
};

function DailyGenerationChart({ dailyGenerations }: Props) {
	return (
		<Card className="bg-slate-800/50 border-slate-700">
			<CardHeader>
				<CardTitle className="text-white">
					Daily FAQ Generation
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={dailyGenerations}>
						<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
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
	);
}

export default DailyGenerationChart;
