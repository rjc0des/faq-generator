"use client";

import React from "react";
import Banner from "./Banner";
import PricingCards from "./PricingCards";
import FAQ from "./FAQ";
import Contact from "./Contact";

function Pricing() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
			{/* Hero Section */}
			<Banner />

			{/* Pricing Cards */}
			<PricingCards />

			{/* FAQ Section */}
			<FAQ />

			{/* Contact Section */}
			<Contact />
		</div>
	);
}

export default Pricing;
