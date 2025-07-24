"use client";

import React from "react";
import Banner from "./Banner";
import Stats from "./Stats";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Testimonial from "./Testimonial";
import CTA from "./CTA";
import Contact from "./Contact";

const LandingPage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-[65px]">
			{/* Hero Section */}
			<Banner />

			{/* Stats Section */}
			<Stats />

			{/* Features Section */}
			<Features />

			{/* How it Works */}
			<HowItWorks />

			{/* Testimonials */}
			<Testimonial />

			{/* CTA Section */}
			<CTA />

			{/* Contact Section */}
			<Contact />
		</div>
	);
};

export default LandingPage;
