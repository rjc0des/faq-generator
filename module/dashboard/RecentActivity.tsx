import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type Props = {
	recentActivity: {
		title: string;
		category: string;
		time: string;
		questions: number;
	}[];
};

function RecentActivity({ recentActivity }: Props) {
	return (
		<Card className="bg-slate-800/50 border-slate-700">
			<CardHeader>
				<CardTitle className="text-white">
					Recent FAQ Generations
				</CardTitle>
			</CardHeader>
			<CardContent>
				{recentActivity.length > 0 ? (
					<div className="space-y-4">
						{recentActivity.map((item, index) => (
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
	);
}

export default RecentActivity;
