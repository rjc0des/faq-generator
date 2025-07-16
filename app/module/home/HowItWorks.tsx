import React from "react";

function HowItWorks() {
	const steps = [
		{
			step: "1",
			title: "Input Product Info",
			description: "Provide your product name and description",
		},
		{
			step: "2",
			title: "AI Processing",
			description: "Our AI analyzes and generates relevant questions",
		},
		{
			step: "3",
			title: "Get Perfect FAQs",
			description: "Receive well-structured, SEO-optimized FAQs",
		},
	];
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-white mb-4">
						How It Works
					</h2>
					<p className="text-xl text-slate-300">
						Simple steps to generate amazing FAQs
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{steps.map((item, index) => (
						<div key={index} className="text-center">
							<div className="w-16 h-16 bg-gradient-to-r from-lavender-600 to-lightblue-600 rounded-full flex items-center justify-center mx-auto mb-6">
								<span className="text-2xl font-bold text-white">
									{item.step}
								</span>
							</div>
							<h3 className="text-xl font-semibold text-white mb-4">
								{item.title}
							</h3>
							<p className="text-slate-300">{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default HowItWorks;
