import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

function Contact() {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-white mb-4">
						Still Have Questions?
					</h2>
					<p className="text-xl text-slate-300 max-w-2xl mx-auto">
						Our team is here to help you find the perfect solution
						for your FAQ generation needs.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					<Card className="bg-slate-800/50 border-slate-700 text-center">
						<CardContent className="p-8">
							<div className="w-16 h-16 bg-gradient-to-r from-lavender-600 to-lightblue-600 rounded-full flex items-center justify-center mx-auto mb-6">
								<Mail className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-xl font-semibold text-white mb-3">
								Email Support
							</h3>
							<p className="text-slate-300 mb-4">
								Get help from our support team within 24 hours.
							</p>
							<Button
								variant="outline"
								className="border-slate-600 text-slate-700 hover:bg-slate-700 hover:text-white"
							>
								support@faqgen.ai
							</Button>
						</CardContent>
					</Card>

					<Card className="bg-slate-800/50 border-slate-700 text-center">
						<CardContent className="p-8">
							<div className="w-16 h-16 bg-gradient-to-r from-lavender-600 to-lightblue-600 rounded-full flex items-center justify-center mx-auto mb-6">
								<Phone className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-xl font-semibold text-white mb-3">
								Phone Support
							</h3>
							<p className="text-slate-300 mb-4">
								Talk to our experts directly for immediate
								assistance.
							</p>
							<Button
								variant="outline"
								className="border-slate-600 text-slate-700 hover:bg-slate-700 hover:text-white"
							>
								+1 (555) 123-4567
							</Button>
						</CardContent>
					</Card>

					<Card className="bg-slate-800/50 border-slate-700 text-center">
						<CardContent className="p-8">
							<div className="w-16 h-16 bg-gradient-to-r from-lavender-600 to-lightblue-600 rounded-full flex items-center justify-center mx-auto mb-6">
								<MapPin className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-xl font-semibold text-white mb-3">
								Visit Us
							</h3>
							<p className="text-slate-300 mb-4">
								Schedule a meeting at our headquarters.
							</p>
							<Button
								variant="outline"
								className="border-slate-600 text-slate-700 hover:bg-slate-700 hover:text-white"
							>
								San Francisco, CA
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}

export default Contact;
