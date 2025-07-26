import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSubscription } from "@/hooks/use-subscription";
import { AlertCircle, Crown } from "lucide-react";
import React from "react";

function UsageStatistics() {
	const { isSubscribed } = useSubscription();
	return (
		<Card className="bg-slate-800/50 border-slate-700">
			<CardHeader>
				<CardTitle className="text-white">FAQ Generation</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{isSubscribed() ? (
					<>
						<div className="flex items-center justify-between">
							<span className="text-slate-300">
								FAQ Generations
							</span>
							<span className="text-white font-medium">
								Unlimited
							</span>
						</div>

						<div className="w-full bg-slate-700 rounded-full h-2">
							<div className="bg-gradient-to-r from-lavender-600 to-lightblue-600 h-2 rounded-full" />
						</div>

						<div className="flex items-center gap-2 text-sm text-green-400">
							<Crown className="h-4 w-4" />
							Pro subscription active - Generate unlimited FAQs!
						</div>
					</>
				) : (
					<>
						<div className="flex items-center justify-between">
							<span className="text-slate-300">
								FAQ Generations
							</span>
							<span className="text-white font-medium">
								0 / 0
							</span>
						</div>

						<div className="w-full bg-slate-700 rounded-full h-2">
							<div className="bg-slate-600 h-2 rounded-full" />
						</div>

						<div className="flex items-center gap-2 p-3 bg-amber-900/20 border border-amber-600/20 rounded-lg">
							<AlertCircle className="h-4 w-4 text-amber-400" />
							<p className="text-amber-400 text-sm">
								Subscribe to Pro plan to start generating FAQs
								with AI.
							</p>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
}

export default UsageStatistics;
