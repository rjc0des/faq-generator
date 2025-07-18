import { Card, CardContent } from "@/components/ui/card";
import { Globe, Shield, Zap } from "lucide-react";
import React from "react";

function Features() {
	const features = [
		{
			icon: Zap,
			title: "Lightning Fast Generation",
			description:
				"Generate comprehensive FAQs in seconds with our advanced AI technology.",
		},
		{
			icon: Shield,
			title: "SEO Optimized",
			description:
				"All FAQs are optimized for search engines to improve your website's visibility.",
		},
		{
			icon: Globe,
			title: "Multi-Language Support",
			description:
				"Create FAQs in multiple languages to reach a global audience.",
		},
	];
	return (
		<section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-white mb-4">
						Powerful Features for Perfect FAQs
					</h2>
					<p className="text-xl text-slate-300 max-w-2xl mx-auto">
						Everything you need to create professional,
						comprehensive FAQ sections that engage your customers.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<Card
							key={index}
							className="bg-slate-800/50 border-slate-700 hover:border-lavender-500/50 transition-colors"
						>
							<CardContent className="p-8 text-center">
								<div className="w-16 h-16 bg-gradient-to-r from-lavender-600 to-lightblue-600 rounded-full flex items-center justify-center mx-auto mb-6">
									<feature.icon className="h-8 w-8 text-white" />
								</div>
								<h3 className="text-2xl font-semibold text-white mb-4">
									{feature.title}
								</h3>
								<p className="text-slate-300 leading-relaxed">
									{feature.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

export default Features;
