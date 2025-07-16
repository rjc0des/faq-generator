"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Banner from "@/app/module/home/Banner";
import Stats from "@/app/module/home/Stats";
import Features from "@/app/module/home/Features";
import HowItWorks from "@/app/module/home/HowItWorks";
import Testimonial from "@/app/module/home/Testimonial";
import CTA from "@/app/module/home/CTA";
import Contact from "@/app/module/home/Contact";

const LandingPage = () => {
	const navigate = useRouter();

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
