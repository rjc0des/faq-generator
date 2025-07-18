import { useToast } from "@/app/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Check, Crown, Sparkles, Zap } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";

function PricingCards() {
	const { toast } = useToast();
	const supabase = createClient();
	const plans = [
		{
			name: "Free",
			price: 0,
			description: "Perfect for trying out our AI FAQ generator",
			features: [
				"5 FAQ generations per month",
				"Basic product categories",
				"Standard FAQ templates",
				"Email support",
			],
			buttonText: "Get Started Free",
			popular: false,
			icon: Sparkles,
			variantId: null,
		},
		{
			name: "Pro",
			price: 19.99,
			description: "Ideal for small businesses and content creators",
			features: [
				"100 FAQ generations per month",
				"All product categories",
				"SEO & Geo optimization",
				"Custom FAQ templates",
				"Priority email support",
				"Export to multiple formats",
			],
			buttonText: "Start Pro Trial",
			popular: true,
			icon: Zap,
			variantId: "123456", // Replace with your actual Lemon Squeezy variant ID
		},
		{
			name: "Enterprise",
			price: 99.99,
			description: "For agencies and large businesses",
			features: [
				"Unlimited FAQ generations",
				"White-label solution",
				"API access",
				"Custom integrations",
				"Dedicated account manager",
				"24/7 phone support",
				"Custom branding",
				"Team management",
			],
			buttonText: "Contact Sales",
			popular: false,
			icon: Crown,
			variantId: "123457", // Replace with your actual Lemon Squeezy variant ID
		},
	];

	const handleSubscribe = async (plan: (typeof plans)[0]) => {
		if (!plan.variantId) {
			toast({
				title: "Current Plan",
				description: "You're already on the free plan!",
			});
			return;
		}

		try {
			const { data, error } = await supabase.functions.invoke(
				"create-lemon-checkout",
				{
					body: {
						variantId: plan.variantId,
						productName: plan.name,
					},
				}
			);

			if (error) {
				throw error;
			}

			if (data?.url) {
				// Open Lemon Squeezy checkout in a new tab
				window.open(data.url, "_blank");
			}
		} catch (error) {
			console.error("Error creating checkout:", error);
			toast({
				title: "Error",
				description:
					"Failed to create checkout session. Please try again.",
				variant: "destructive",
			});
		}
	};
	return (
		<section className="px-4 sm:px-6 lg:px-8 pb-20">
			<div className="max-w-7xl mx-auto">
				<div className="grid md:grid-cols-3 gap-8">
					{plans.map((plan, index) => (
						<Card
							key={index}
							className={`relative bg-slate-800/50 border-slate-700 ${
								plan.popular
									? "ring-2 ring-lavender-500 scale-105"
									: ""
							}`}
						>
							{plan.popular && (
								<Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
									Most Popular
								</Badge>
							)}

							<CardHeader className="text-center pb-8">
								<div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
									<plan.icon className="h-6 w-6 text-lavender-400" />
								</div>
								<CardTitle className="text-2xl text-white mb-2">
									{plan.name}
								</CardTitle>
								<div className="mb-4">
									<span className="text-4xl font-bold text-white">
										${plan.price}
									</span>
									<span className="text-slate-400 ml-2">
										/month
									</span>
								</div>
								<p className="text-slate-300 text-sm">
									{plan.description}
								</p>
							</CardHeader>

							<CardContent className="space-y-6">
								<ul className="space-y-3">
									{plan.features.map(
										(feature, featureIndex) => (
											<li
												key={featureIndex}
												className="flex items-start space-x-3"
											>
												<Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
												<span className="text-slate-300 text-sm">
													{feature}
												</span>
											</li>
										)
									)}
								</ul>

								<Button
									className={`w-full h-12 ${
										plan.popular
											? "bg-gradient-to-r from-lavender-600 to-lightblue-600 hover:from-lavender-700 hover:to-lightblue-700 text-white"
											: "border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
									}`}
									onClick={() => handleSubscribe(plan)}
								>
									{plan.buttonText}
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

export default PricingCards;
