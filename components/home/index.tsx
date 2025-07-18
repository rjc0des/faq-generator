"use client";

import React from "react";
import Banner from "@/module/home/Banner";
import Stats from "@/module/home/Stats";
import Features from "@/module/home/Features";
import HowItWorks from "@/module/home/HowItWorks";
import Testimonial from "@/module/home/Testimonial";
import CTA from "@/module/home/CTA";
import Contact from "@/module/home/Contact";

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
