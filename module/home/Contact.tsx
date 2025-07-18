import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import React from "react";

function Contact() {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-white mb-4">
						Get in Touch
					</h2>
					<p className="text-xl text-slate-300 max-w-2xl mx-auto">
						Have questions? We're here to help you succeed with our
						FAQ generator.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-12">
					{/* Contact Info */}
					<div className="space-y-8">
						<div className="flex items-start gap-4">
							<div className="w-12 h-12 bg-gradient-to-r from-lavender-600 to-lightblue-600 rounded-lg flex items-center justify-center flex-shrink-0">
								<Mail className="h-6 w-6 text-white" />
							</div>
							<div>
								<h3 className="text-xl font-semibold text-white mb-2">
									Email Us
								</h3>
								<p className="text-slate-300 mb-2">
									Get support within 24 hours
								</p>
								<a
									href="mailto:support@faqgen.ai"
									className="text-lavender-400 hover:text-lavender-300 transition-colors"
								>
									support@faqgen.ai
								</a>
							</div>
						</div>

						<div className="flex items-start gap-4">
							<div className="w-12 h-12 bg-gradient-to-r from-lavender-600 to-lightblue-600 rounded-lg flex items-center justify-center flex-shrink-0">
								<Phone className="h-6 w-6 text-white" />
							</div>
							<div>
								<h3 className="text-xl font-semibold text-white mb-2">
									Call Us
								</h3>
								<p className="text-slate-300 mb-2">
									Monday to Friday, 9AM-6PM PST
								</p>
								<a
									href="tel:+15551234567"
									className="text-lavender-400 hover:text-lavender-300 transition-colors"
								>
									+1 (555) 123-4567
								</a>
							</div>
						</div>

						<div className="flex items-start gap-4">
							<div className="w-12 h-12 bg-gradient-to-r from-lavender-600 to-lightblue-600 rounded-lg flex items-center justify-center flex-shrink-0">
								<MessageCircle className="h-6 w-6 text-white" />
							</div>
							<div>
								<h3 className="text-xl font-semibold text-white mb-2">
									Live Chat
								</h3>
								<p className="text-slate-300 mb-2">
									Instant support during business hours
								</p>
								<button className="text-lavender-400 hover:text-lavender-300 transition-colors">
									Start Chat
								</button>
							</div>
						</div>

						<div className="flex items-start gap-4">
							<div className="w-12 h-12 bg-gradient-to-r from-lavender-600 to-lightblue-600 rounded-lg flex items-center justify-center flex-shrink-0">
								<MapPin className="h-6 w-6 text-white" />
							</div>
							<div>
								<h3 className="text-xl font-semibold text-white mb-2">
									Visit Us
								</h3>
								<p className="text-slate-300">
									123 Innovation Drive
									<br />
									San Francisco, CA 94107
									<br />
									United States
								</p>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<Card className="bg-slate-800/50 border-slate-700">
						<CardContent className="p-8">
							<h3 className="text-2xl font-semibold text-white mb-6">
								Send us a message
							</h3>
							<form className="space-y-6">
								<div className="grid md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-slate-300 mb-2">
											First Name
										</label>
										<input
											type="text"
											className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
											placeholder="John"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-slate-300 mb-2">
											Last Name
										</label>
										<input
											type="text"
											className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
											placeholder="Doe"
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">
										Email
									</label>
									<input
										type="email"
										className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
										placeholder="john@example.com"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">
										Subject
									</label>
									<input
										type="text"
										className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
										placeholder="How can we help?"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">
										Message
									</label>
									<textarea
										rows={4}
										className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent resize-none"
										placeholder="Tell us more about your needs..."
									/>
								</div>

								<Button
									type="submit"
									className="w-full bg-gradient-to-r from-lavender-600 to-lightblue-600 hover:from-lavender-700 hover:to-lightblue-700 text-white py-3"
								>
									Send Message
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}

export default Contact;
