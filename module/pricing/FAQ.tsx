import { Card, CardContent } from "@/components/ui/card";
import React from "react";

function FAQ() {
	const Faqs = [
		{
			q: "Can I change my plan at any time?",
			a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.",
		},
		{
			q: "What happens if I exceed my plan's limits?",
			a: "We'll notify you when you're approaching your limits. You can either upgrade your plan or wait for your monthly quota to reset.",
		},
		{
			q: "Do you offer refunds?",
			a: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll provide a full refund.",
		},
		{
			q: "Is there a free trial for paid plans?",
			a: "Yes, all paid plans come with a 14-day free trial. No credit card required to start your trial.",
		},
	];

	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-white mb-4">
						Frequently Asked Questions
					</h2>
					<p className="text-slate-300">
						Everything you need to know about our pricing and plans.
					</p>
				</div>

				<div className="space-y-6">
					{Faqs.map((faq, index) => (
						<Card
							key={index}
							className="bg-slate-800/50 border-slate-700"
						>
							<CardContent className="p-6">
								<h3 className="text-lg font-semibold text-white mb-2">
									{faq.q}
								</h3>
								<p className="text-slate-300">{faq.a}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

export default FAQ;
