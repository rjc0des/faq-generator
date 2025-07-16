import { FileText, Star, TrendingUp, Users } from "lucide-react";
import React from "react";

function Stats() {
	const stats = [
		{ icon: Users, number: "10K+", label: "Happy Users" },
		{ icon: FileText, number: "500K+", label: "FAQs Generated" },
		{ icon: TrendingUp, number: "99.9%", label: "Uptime" },
		{ icon: Star, number: "4.9/5", label: "User Rating" },
	];
	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{stats.map((stat, index) => (
						<div key={index} className="text-center">
							<div className="w-12 h-12 bg-gradient-to-r from-lavender-600 to-lightblue-600 rounded-full flex items-center justify-center mx-auto mb-4">
								<stat.icon className="h-6 w-6 text-white" />
							</div>
							<div className="text-3xl font-bold text-white mb-2">
								{stat.number}
							</div>
							<div className="text-slate-400">{stat.label}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Stats;
