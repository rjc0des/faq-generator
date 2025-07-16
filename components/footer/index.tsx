import { Sparkles } from "lucide-react";
import React from "react";

function Footer() {
	return (
		<footer className="bg-slate-900 border-t border-slate-700">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid md:grid-cols-4 gap-8">
					<div className="col-span-1">
						<div className="flex items-center space-x-3 mb-4">
							<Sparkles className="h-8 w-8 text-lavender-400" />
							<span className="text-xl font-bold text-white">
								FAQ Generator AI
							</span>
						</div>
						<p className="text-slate-400 mb-4">
							Generate professional FAQs instantly with our
							AI-powered tool. Perfect for businesses of all
							sizes.
						</p>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-slate-400 hover:text-white transition-colors"
							>
								<span className="sr-only">Twitter</span>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
								</svg>
							</a>
							<a
								href="#"
								className="text-slate-400 hover:text-white transition-colors"
							>
								<span className="sr-only">LinkedIn</span>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
								</svg>
							</a>
						</div>
					</div>

					<div>
						<h4 className="text-white font-semibold mb-4">
							Product
						</h4>
						<ul className="space-y-2">
							<li>
								<a
									href="#features"
									className="text-slate-400 hover:text-white transition-colors"
								>
									Features
								</a>
							</li>
							<li>
								<a
									href="/pricing"
									className="text-slate-400 hover:text-white transition-colors"
								>
									Pricing
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-slate-400 hover:text-white transition-colors"
								>
									API
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-slate-400 hover:text-white transition-colors"
								>
									Documentation
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-white font-semibold mb-4">
							Company
						</h4>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-slate-400 hover:text-white transition-colors"
								>
									About
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-slate-400 hover:text-white transition-colors"
								>
									Blog
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-slate-400 hover:text-white transition-colors"
								>
									Careers
								</a>
							</li>
							<li>
								<a
									href="#contact"
									className="text-slate-400 hover:text-white transition-colors"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-white font-semibold mb-4">
							Support
						</h4>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-slate-400 hover:text-white transition-colors"
								>
									Help Center
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-slate-400 hover:text-white transition-colors"
								>
									Community
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-slate-400 hover:text-white transition-colors"
								>
									Status
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-slate-400 hover:text-white transition-colors"
								>
									Contact Support
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-slate-400 text-sm">
						© 2024 FAQ Generator AI. All rights reserved.
					</p>
					<div className="flex space-x-6 mt-4 md:mt-0">
						<a
							href="#"
							className="text-slate-400 hover:text-white transition-colors text-sm"
						>
							Privacy Policy
						</a>
						<a
							href="#"
							className="text-slate-400 hover:text-white transition-colors text-sm"
						>
							Terms of Service
						</a>
						<a
							href="#"
							className="text-slate-400 hover:text-white transition-colors text-sm"
						>
							Cookie Policy
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
