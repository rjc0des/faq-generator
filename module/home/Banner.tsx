"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function Banner() {
	const navigate = useRouter();
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center">
					<h1 className="text-5xl md:text-7xl font-bold mb-6">
						<span className="bg-gradient-to-r from-lavender-400 via-lightblue-400 to-lavender-300 bg-clip-text text-transparent">
							Generate Perfect
						</span>
						<br />
						<span className="text-white">FAQs Instantly</span>
					</h1>
					<p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8">
						Transform your product descriptions into comprehensive,
						SEO-optimized FAQ sections using advanced AI technology.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							size="lg"
							onClick={() => navigate.push("/generator")}
							className="bg-gradient-to-r from-lavender-600 to-lightblue-600 hover:from-lavender-700 hover:to-lightblue-700 text-white text-lg px-8 py-4"
						>
							Start Generating{" "}
							<ArrowRight className="ml-2 h-5 w-5" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							onClick={() => navigate.push("/pricing")}
							className="border-slate-600 text-slate-700 hover:bg-slate-700 hover:text-white text-lg px-8 py-4"
						>
							View Pricing
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Banner;
