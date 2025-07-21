import { Card, CardContent } from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import React from "react";

type Props = {
	stats: {
		title: string;
		value: string;
		change: string;
		icon: React.ForwardRefExoticComponent<
			Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
		>;
		color: string;
	}[];
};

function StatCards({ stats }: Props) {
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{stats.map((stat, index) => (
				<Card key={index} className="bg-slate-800/50 border-slate-700">
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
		</section>
	);
}

export default StatCards;
