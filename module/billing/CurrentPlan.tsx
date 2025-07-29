import { getCheckoutURL } from "@/app/actions/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSubscription } from "@/hooks/use-subscription";
import { toast } from "@/hooks/use-toast";
import { Crown, ExternalLink } from "lucide-react";
import React from "react";

function CurrentPlan() {
	const { subscription, isSubscribed } = useSubscription();

	const handleCreateCheckout = async () => {
		try {
			const url = await getCheckoutURL();
			console.log(url);

			// const { data, error } = await supabase.functions.invoke(
			// 	"create-lemon-checkout"
			// );

			// if (error) throw error;

			if (url) {
				window.open(url, "_blank");
			}
		} catch (error) {
			toast({
				title: "Error",
				description:
					"Failed to create checkout session. Please try again.",
				variant: "destructive",
			});
		}
	};

	return (
		<Card className="bg-slate-800/50 border-slate-700">
			<CardHeader>
				<CardTitle className="text-white flex items-center gap-2">
					Current Plan
					<Badge
						className={
							isSubscribed()
								? "bg-green-600 text-white"
								: "bg-slate-600 text-white"
						}
					>
						{isSubscribed() ? "Active" : "Free"}
					</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{isSubscribed() && subscription ? (
					<>
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-xl font-semibold text-white">
									{subscription.plan_name || "Pro"} Plan
								</h3>
								<p className="text-slate-400">
									${(subscription.plan_price || 0) / 100}/
									{subscription.billing_cycle || "month"}
								</p>
							</div>
							<div className="text-right">
								<p className="text-sm text-slate-400">
									Next billing date
								</p>
								<p className="text-white font-medium">
									{subscription.current_period_end
										? new Date(
												subscription.current_period_end
										  ).toLocaleDateString()
										: "N/A"}
								</p>
							</div>
						</div>

						<div className="flex gap-4">
							<Button
								variant="outline"
								className="border-slate-600 text-slate-700 hover:bg-slate-700"
								onClick={() =>
									window.open(
										"https://app.lemonsqueezy.com/my-orders",
										"_blank"
									)
								}
							>
								<ExternalLink className="mr-2 h-4 w-4" />
								Manage Subscription
							</Button>
						</div>
					</>
				) : (
					<div className="text-center py-8">
						<div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
							<Crown className="h-8 w-8 text-slate-400" />
						</div>
						<h3 className="text-lg font-semibold text-white mb-2">
							Free Plan
						</h3>
						<p className="text-slate-400 mb-4">
							Upgrade to Pro to unlock unlimited FAQ generation
						</p>
						<Button
							onClick={handleCreateCheckout}
							className="bg-gradient-to-r from-lavender-600 to-lightblue-600 hover:from-lavender-700 hover:to-lightblue-700 text-white"
						>
							<Crown className="mr-2 h-4 w-4" />
							Upgrade Now
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export default CurrentPlan;
