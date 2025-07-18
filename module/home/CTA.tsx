"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function CTA() {
	const navigate = useRouter();
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-lavender-900/20 to-lightblue-900/20">
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
					Ready to Create Amazing FAQs?
				</h2>
				<p className="text-xl text-slate-300 mb-8">
					Join thousands of businesses using our AI-powered FAQ
					generator.
				</p>
				<Button
					size="lg"
					onClick={() => navigate.push("/generator")}
					className="bg-gradient-to-r from-lavender-600 to-lightblue-600 hover:from-lavender-700 hover:to-lightblue-700 text-white text-lg px-12 py-4"
				>
					Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
				</Button>
			</div>
		</section>
	);
}

export default CTA;
