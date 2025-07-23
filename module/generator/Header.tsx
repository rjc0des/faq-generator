import { Sparkles } from "lucide-react";
import React from "react";

function Header() {
	return (
		<div className="text-center mb-12">
			<div className="flex items-center justify-center mb-4">
				<Sparkles className="h-8 w-8 text-lavender-400 mr-3" />
				<h1 className="text-4xl md:text-5xl font-bold text-white">
					AI FAQ Generator
				</h1>
			</div>
			<p className="text-xl text-slate-300 max-w-2xl mx-auto">
				Transform your product descriptions into comprehensive,
				SEO-optimized FAQs using Gemini Flash 2.0
			</p>
		</div>
	);
}

export default Header;
