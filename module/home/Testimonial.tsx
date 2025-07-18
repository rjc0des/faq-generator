import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";

function Testimonial() {
	const testimonials = [
		{
			name: "Sarah Johnson",
			role: "Product Manager",
			company: "TechCorp",
			content:
				"This tool saved us hours of work. The AI-generated FAQs are incredibly accurate and well-structured.",
			avatar: "SJ",
		},
		{
			name: "Mike Chen",
			role: "Marketing Director",
			company: "StartupXYZ",
			content:
				"Perfect for our customer support team. The quality of generated FAQs is outstanding.",
			avatar: "MC",
		},
		{
			name: "Emily Davis",
			role: "Content Strategist",
			company: "MediaPlus",
			content:
				"The best FAQ generator I've used. It understands context and creates relevant questions.",
			avatar: "ED",
		},
	];
	return (
		<section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-white mb-4">
						What Our Users Say
					</h2>
					<p className="text-xl text-slate-300">
						Join thousands of satisfied customers
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<Card
							key={index}
							className="bg-slate-800/50 border-slate-700"
						>
							<CardContent className="p-6 flex flex-col h-full">
								<div className="flex items-center mb-4">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className="h-5 w-5 text-yellow-400 fill-current"
										/>
									))}
								</div>
								<p className="text-slate-300 mb-6 italic">
									"{testimonial.content}"
								</p>
								<div className="flex items-end flex-1">
									<div className="w-10 h-10 bg-gradient-to-r from-lavender-600 to-lightblue-600 rounded-full flex items-center justify-center mr-3">
										<span className="text-white font-semibold text-sm">
											{testimonial.avatar}
										</span>
									</div>
									<div>
										<div className="text-white font-semibold">
											{testimonial.name}
										</div>
										<div className="text-slate-400 text-sm">
											{testimonial.role} at{" "}
											{testimonial.company}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

export default Testimonial;
