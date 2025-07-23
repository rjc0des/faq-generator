"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Sparkles,
	Zap,
	ArrowRight,
	FileText,
	Copy,
	Trash2,
	Code,
	Crown,
	Lock,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from "@/hooks/use-subscription";
import { useMonthlyUsage } from "@/hooks/use-monthly-usage";
import Header from "./Header";

interface FAQ {
	id: number;
	question: string;
	answer: string;
}

const FAQGenerator = () => {
	const supabase = createClient();
	const [productDescription, setProductDescription] = useState("");
	const [productCategory, setProductCategory] = useState("");
	const [seoOptimization, setSeoOptimization] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);
	const [generatedFAQs, setGeneratedFAQs] = useState<FAQ[]>([]);
	const [showJson, setShowJson] = useState(false);
	const [generationId, setGenerationId] = useState<string | null>(null);
	const { toast } = useToast();
	const { isSubscribed, canAccessFeature } = useSubscription();
	const {
		canGenerate,
		getRemainingGenerations,
		getMonthlyLimit,
		getCurrentUsage,
		incrementUsage,
	} = useMonthlyUsage();

	const categories = [
		"Electronics",
		"Fashion & Apparel",
		"Home & Furniture",
		"Beauty & Personal Care",
		"Sports & Outdoors",
		"Books & Media",
		"Food & Beverages",
		"Health & Wellness",
		"Automotive",
		"Business Services",
		"Software & Digital",
		"Travel & Hospitality",
	];

	const handleGenerate = async () => {
		if (!productDescription.trim() || !productCategory) return;

		if (!canGenerate()) {
			const remaining = getRemainingGenerations();
			const monthlyLimit = getMonthlyLimit();
			const planName = canAccessFeature("pro") ? "Pro" : "Free";

			toast({
				title: "Monthly Limit Reached",
				description: `${planName} users can generate ${monthlyLimit} FAQs per month. ${
					remaining === 0
						? "Try again next month or upgrade your plan."
						: `You have ${remaining} generations left this month.`
				}`,
				variant: "destructive",
			});
			return;
		}

		setIsGenerating(true);

		try {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			if (!session) {
				toast({
					title: "Authentication Required",
					description: "Please log in to generate FAQs.",
					variant: "destructive",
				});
				return;
			}

			const response = await supabase.functions.invoke("generate-faq", {
				body: {
					productDescription,
					productCategory,
					seoOptimization,
					title: `${productCategory} FAQ - ${new Date().toLocaleDateString()}`,
				},
			});

			if (response.error) {
				throw new Error(response.error.message);
			}

			if (response.data.error) {
				throw new Error(response.data.error);
			}

			setGeneratedFAQs(response.data.faqs);
			setGenerationId(response.data.generationId);

			// Update usage count
			await incrementUsage();

			const remaining = getRemainingGenerations() - 1;
			toast({
				title: "FAQs Generated Successfully!",
				description: `Generated ${response.data.faqs.length} FAQs using Gemini Flash 2.0. ${remaining} generations remaining this month.`,
			});
		} catch (error) {
			console.error("Error generating FAQs:", error);
			toast({
				title: "Generation Failed",
				description:
					error instanceof Error
						? error.message
						: "Failed to generate FAQs. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsGenerating(false);
		}
	};

	const handleCopyFAQ = (faq: FAQ) => {
		const text = `Q: ${faq.question}\nA: ${faq.answer}`;
		navigator.clipboard.writeText(text);
		toast({
			title: "Copied!",
			description: "FAQ copied to clipboard",
		});
	};

	const handleCopyJson = () => {
		const jsonData = JSON.stringify(generatedFAQs, null, 2);
		navigator.clipboard.writeText(jsonData);
		toast({
			title: "JSON Copied!",
			description: "FAQ data copied as JSON to clipboard",
		});
	};

	const handleDeleteFAQ = (id: number) => {
		setGeneratedFAQs((faqs) => faqs.filter((faq) => faq.id !== id));
		toast({
			title: "FAQ Removed",
			description: "FAQ item has been removed from the list",
		});
	};

	const characterCount = productDescription.length;
	const maxCharacters = 2000;

	// const handleInsert = async () => {
	// 	const {
	// 		data: { user },
	// 	} = await supabase.auth.getUser();
	// 	await supabase.from("subscriptions").insert({
	// 		user_id: user?.id || "",
	// 		status: "active",
	// 		plan_name: "free",
	// 		plan_price: 0,
	// 		current_period_start: new Date().toISOString(),
	// 		current_period_end: new Date(
	// 			Date.now() + 30 * 24 * 60 * 60 * 1000
	// 		).toISOString(),
	// 	});
	// };

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<Header />

				<div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
					{/* Form Section */}
					<Card className="bg-slate-800/50 border-slate-700">
						<CardHeader>
							<CardTitle className="text-2xl text-white flex items-center">
								<Zap className="h-6 w-6 text-lavender-400 mr-2" />
								Generate Your FAQs
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Product Category */}
							<div className="space-y-2">
								<Label
									htmlFor="category"
									className="text-slate-200 font-medium"
								>
									Product Category
								</Label>
								<Select
									value={productCategory}
									onValueChange={setProductCategory}
								>
									<SelectTrigger className="bg-slate-700 border-slate-600 text-white">
										<SelectValue placeholder="Select your product category" />
									</SelectTrigger>
									<SelectContent className="bg-slate-800 border-slate-700">
										{categories.map((category) => (
											<SelectItem
												key={category}
												value={category}
												className="text-white hover:bg-slate-700"
											>
												{category}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{/* Product Description */}
							<div className="space-y-2">
								<Label
									htmlFor="description"
									className="text-slate-200 font-medium"
								>
									Product Description
								</Label>
								<Textarea
									id="description"
									placeholder="Describe your product in detail. Include features, benefits, target audience, and any unique selling points..."
									value={productDescription}
									onChange={(e) =>
										setProductDescription(e.target.value)
									}
									className="min-h-[200px] bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
									maxLength={maxCharacters}
								/>
								<div className="flex justify-between text-sm">
									<span className="text-slate-400">
										Be detailed for better results
									</span>
									<span
										className={`${
											characterCount > maxCharacters * 0.9
												? "text-yellow-400"
												: "text-slate-400"
										}`}
									>
										{characterCount}/{maxCharacters}
									</span>
								</div>
							</div>

							{/* SEO Toggle */}
							<div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600">
								<div className="space-y-1">
									<Label
										htmlFor="seo-toggle"
										className="text-slate-200 font-medium"
									>
										SEO & Geo Optimization
									</Label>
									<p className="text-sm text-slate-400">
										Optimize FAQs for search engines and
										local targeting{" "}
										{!canAccessFeature("pro") &&
											"(Pro only)"}
									</p>
								</div>
								<Switch
									id="seo-toggle"
									checked={seoOptimization}
									onCheckedChange={setSeoOptimization}
									disabled={!canAccessFeature("pro")}
								/>
							</div>

							{/* Generate Button */}
							{/* Usage Display */}
							<div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
								<div className="text-sm text-slate-300">
									<span className="font-medium">
										Monthly Usage:
									</span>{" "}
									{getCurrentUsage()}/{getMonthlyLimit()} FAQs
								</div>
								<div className="text-xs text-slate-400">
									{canAccessFeature("pro")
										? "Pro Plan"
										: "Free Plan"}
								</div>
							</div>

							<Button
								onClick={handleGenerate}
								disabled={
									!productDescription.trim() ||
									!productCategory ||
									isGenerating ||
									!canGenerate()
								}
								className={`w-full h-12 text-lg font-semibold ${
									canGenerate()
										? "bg-gradient-to-r from-lavender-600 to-lightblue-600 hover:from-lavender-700 hover:to-lightblue-700 text-white"
										: "bg-slate-600 text-slate-400 cursor-not-allowed"
								}`}
							>
								{!canGenerate() ? (
									getRemainingGenerations() === 0 ? (
										<>
											<Lock className="mr-2 h-5 w-5" />
											Monthly Limit Reached
										</>
									) : (
										<>
											<Lock className="mr-2 h-5 w-5" />
											Subscribe for More
										</>
									)
								) : isGenerating ? (
									<>
										<div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
										Generating with Gemini...
									</>
								) : (
									<>
										Generate FAQs
										<ArrowRight className="ml-2 h-5 w-5" />
									</>
								)}
							</Button>

							{(!canAccessFeature("pro") ||
								getRemainingGenerations() === 0) && (
								<div className="p-4 bg-amber-900/20 border border-amber-600/20 rounded-lg">
									<div className="flex items-center gap-2 text-amber-400 mb-2">
										<Crown className="h-4 w-4" />
										<span className="font-medium">
											{!canAccessFeature("pro")
												? "Upgrade to Pro"
												: "Monthly Limit Reached"}
										</span>
									</div>
									<p className="text-sm text-amber-300 mb-3">
										{!canAccessFeature("pro")
											? "Free: 3 FAQs/month • Pro: 30 FAQs/month with SEO & geo optimization"
											: "Pro users get 30 FAQ generations per month. Your limit resets next month."}
									</p>
									{!canAccessFeature("pro") && (
										<Button
											size="sm"
											className="bg-gradient-to-r from-lavender-600 to-lightblue-600 hover:from-lavender-700 hover:to-lightblue-700 text-white"
											onClick={() =>
												(window.location.href =
													"/billing")
											}
										>
											<Crown className="mr-1 h-4 w-4" />
											Upgrade Now
										</Button>
									)}
								</div>
							)}
						</CardContent>
					</Card>

					{/* Results Section */}
					<Card className="bg-slate-800/50 border-slate-700">
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle className="text-2xl text-white flex items-center">
									<FileText className="h-6 w-6 text-lightblue-400 mr-2" />
									Generated FAQs
								</CardTitle>
								{generatedFAQs.length > 0 && (
									<div className="flex items-center gap-2">
										<Switch
											id="json-toggle"
											checked={showJson}
											onCheckedChange={setShowJson}
										/>
										<Label
											htmlFor="json-toggle"
											className="text-slate-300 text-sm"
										>
											JSON View
										</Label>
									</div>
								)}
							</div>
						</CardHeader>
						<CardContent>
							{generatedFAQs.length === 0 ? (
								<div className="text-center py-12">
									<div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
										<FileText className="h-8 w-8 text-slate-400" />
									</div>
									<h3 className="text-lg font-semibold text-slate-300 mb-2">
										No FAQs Generated Yet
									</h3>
									<p className="text-slate-400 max-w-sm mx-auto">
										Fill out the form and click "Generate
										FAQs" to see your AI-powered frequently
										asked questions appear here.
									</p>
								</div>
							) : showJson ? (
								<div className="space-y-4">
									<div className="flex justify-between items-center">
										<h3 className="text-lg font-semibold text-white">
											JSON Format
										</h3>
										<Button
											variant="outline"
											size="sm"
											onClick={handleCopyJson}
											className="border-slate-600 text-slate-300 hover:bg-slate-700"
										>
											<Code className="h-4 w-4 mr-1" />
											Copy JSON
										</Button>
									</div>
									<pre className="bg-slate-900 p-4 rounded-lg text-sm text-slate-300 overflow-auto max-h-96 border border-slate-600">
										{JSON.stringify(generatedFAQs, null, 2)}
									</pre>
								</div>
							) : (
								<div className="space-y-4">
									<Table>
										<TableHeader>
											<TableRow className="border-slate-600">
												<TableHead className="text-slate-300">
													Question
												</TableHead>
												<TableHead className="text-slate-300">
													Answer
												</TableHead>
												<TableHead className="text-slate-300 w-24">
													Actions
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{generatedFAQs.map((faq) => (
												<TableRow
													key={faq.id}
													className="border-slate-600"
												>
													<TableCell className="text-white font-medium align-top">
														{faq.question}
													</TableCell>
													<TableCell className="text-slate-300 align-top">
														{faq.answer}
													</TableCell>
													<TableCell className="align-top">
														<div className="flex gap-2">
															<Button
																variant="ghost"
																size="sm"
																onClick={() =>
																	handleCopyFAQ(
																		faq
																	)
																}
																className="text-slate-400 hover:text-white hover:bg-slate-700"
															>
																<Copy className="h-4 w-4" />
															</Button>
															<Button
																variant="ghost"
																size="sm"
																onClick={() =>
																	handleDeleteFAQ(
																		faq.id
																	)
																}
																className="text-slate-400 hover:text-red-400 hover:bg-slate-700"
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>

									<div className="pt-4 border-t border-slate-600">
										<Button
											variant="outline"
											className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
											onClick={() => {
												const allFAQs = generatedFAQs
													.map(
														(faq) =>
															`Q: ${faq.question}\nA: ${faq.answer}`
													)
													.join("\n\n");
												navigator.clipboard.writeText(
													allFAQs
												);
												toast({
													title: "All FAQs Copied!",
													description:
														"All FAQs have been copied to clipboard",
												});
											}}
										>
											Copy All FAQs
										</Button>
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default FAQGenerator;
