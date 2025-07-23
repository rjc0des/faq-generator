"use client";

import React, { useState } from "react";
import { useAnalyticsData, FaqGeneration } from "@/hooks/use-analytics-data";
import { useFAQItems } from "@/hooks/use-FAQ-items";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Eye, FileText, Calendar, Hash, Copy, Code } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const FAQTable = () => {
	const { data: faqGenerations, isLoading, error } = useAnalyticsData();
	const [selectedFaq, setSelectedFaq] = useState<FaqGeneration | null>(null);
	const [showJson, setShowJson] = useState(false);
	const { data: faqItems, isLoading: itemsLoading } = useFAQItems(
		selectedFaq?.id || null
	);
	const { toast } = useToast();

	const handleCopyFAQ = (question: string, answer: string) => {
		const text = `Q: ${question}\nA: ${answer}`;
		navigator.clipboard.writeText(text);
		toast({
			title: "Copied!",
			description: "FAQ copied to clipboard",
		});
	};

	const handleCopyJson = () => {
		if (faqItems) {
			const jsonData = JSON.stringify(faqItems, null, 2);
			navigator.clipboard.writeText(jsonData);
			toast({
				title: "JSON Copied!",
				description: "FAQ data copied as JSON to clipboard",
			});
		}
	};

	const handleCopyAllFAQs = () => {
		if (faqItems) {
			const allFAQs = faqItems
				.map((item) => `Q: ${item.question}\nA: ${item.answer}`)
				.join("\n\n");
			navigator.clipboard.writeText(allFAQs);
			toast({
				title: "All FAQs Copied!",
				description: "All FAQs have been copied to clipboard",
			});
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-slate-400">Loading FAQ generations...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-red-400">
					Error loading FAQ generations
				</div>
			</div>
		);
	}

	if (!faqGenerations || faqGenerations.length === 0) {
		return (
			<Card className="bg-slate-800 border-slate-700">
				<CardContent className="flex flex-col items-center justify-center h-64 text-center">
					<FileText className="h-12 w-12 text-slate-400 mb-4" />
					<h3 className="text-lg font-semibold text-white mb-2">
						No FAQ Generations Yet
					</h3>
					<p className="text-slate-400 mb-4">
						You haven't generated any FAQs yet. Start by using the
						FAQ Generator.
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold text-white mb-2">
					Generated FAQs
				</h2>
				<p className="text-slate-400">
					Manage and view your generated FAQ collections
				</p>
			</div>

			<Card className="bg-slate-800 border-slate-700">
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow className="border-slate-700 hover:bg-slate-700/50">
								<TableHead className="text-slate-300">
									Title
								</TableHead>
								<TableHead className="text-slate-300">
									Category
								</TableHead>
								<TableHead className="text-slate-300">
									Questions
								</TableHead>
								<TableHead className="text-slate-300">
									Created
								</TableHead>
								<TableHead className="text-slate-300">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{faqGenerations.map((faq) => (
								<TableRow
									key={faq.id}
									className="border-slate-700 hover:bg-slate-700/30"
								>
									<TableCell className="font-medium text-white">
										{faq.title}
									</TableCell>
									<TableCell>
										<Badge
											variant="secondary"
											className="bg-lavender-600/20 text-lavender-300"
										>
											{faq.category}
										</Badge>
									</TableCell>
									<TableCell className="text-slate-300">
										<div className="flex items-center gap-1">
											<Hash className="h-4 w-4" />
											{faq.questions_count}
										</div>
									</TableCell>
									<TableCell className="text-slate-300">
										<div className="flex items-center gap-1">
											<Calendar className="h-4 w-4" />
											{format(
												new Date(faq.created_at),
												"MMM d, yyyy"
											)}
										</div>
									</TableCell>
									<TableCell>
										<Dialog>
											<DialogTrigger asChild>
												<Button
													variant="ghost"
													size="sm"
													className="text-slate-300 hover:text-white hover:bg-slate-700"
													onClick={() =>
														setSelectedFaq(faq)
													}
												>
													<Eye className="h-4 w-4 mr-1" />
													View
												</Button>
											</DialogTrigger>
											<DialogContent className="bg-slate-800 border-slate-700 max-w-4xl max-h-[80vh] overflow-y-auto">
												<DialogHeader>
													<div className="flex items-center justify-between">
														<DialogTitle className="text-white">
															FAQ Generation
															Details
														</DialogTitle>
														{faqItems &&
															faqItems.length >
																0 && (
																<div className="flex items-center gap-2">
																	<Switch
																		id="json-toggle"
																		checked={
																			showJson
																		}
																		onCheckedChange={
																			setShowJson
																		}
																	/>
																	<Label
																		htmlFor="json-toggle"
																		className="text-slate-300 text-sm"
																	>
																		JSON
																		View
																	</Label>
																</div>
															)}
													</div>
												</DialogHeader>
												{selectedFaq && (
													<div className="space-y-4">
														<div className="grid grid-cols-2 gap-4">
															<div>
																<label className="text-sm font-medium text-slate-300">
																	Title
																</label>
																<p className="text-white mt-1">
																	{
																		selectedFaq.title
																	}
																</p>
															</div>
															<div>
																<label className="text-sm font-medium text-slate-300">
																	Category
																</label>
																<div className="mt-1">
																	<Badge
																		variant="secondary"
																		className="bg-lavender-600/20 text-lavender-300"
																	>
																		{
																			selectedFaq.category
																		}
																	</Badge>
																</div>
															</div>
															<div>
																<label className="text-sm font-medium text-slate-300">
																	Questions
																	Count
																</label>
																<p className="text-white mt-1">
																	{
																		selectedFaq.questions_count
																	}{" "}
																	questions
																</p>
															</div>
															<div>
																<label className="text-sm font-medium text-slate-300">
																	Created Date
																</label>
																<p className="text-white mt-1">
																	{format(
																		new Date(
																			selectedFaq.created_at
																		),
																		"MMMM d, yyyy 'at' h:mm a"
																	)}
																</p>
															</div>
														</div>

														<div className="border-t border-slate-600 pt-4">
															<div className="flex items-center justify-between mb-4">
																<h3 className="text-lg font-semibold text-white">
																	FAQ Items
																</h3>
																{faqItems &&
																	faqItems.length >
																		0 && (
																		<div className="flex gap-2">
																			{showJson && (
																				<Button
																					variant="outline"
																					size="sm"
																					onClick={
																						handleCopyJson
																					}
																					className="border-slate-600 text-slate-300 hover:bg-slate-700"
																				>
																					<Code className="h-4 w-4 mr-1" />
																					Copy
																					JSON
																				</Button>
																			)}
																			<Button
																				variant="outline"
																				size="sm"
																				onClick={
																					handleCopyAllFAQs
																				}
																				className="border-slate-600 text-slate-300 hover:bg-slate-700"
																			>
																				<Copy className="h-4 w-4 mr-1" />
																				Copy
																				All
																			</Button>
																		</div>
																	)}
															</div>

															{itemsLoading ? (
																<div className="text-center py-8">
																	<div className="text-slate-400">
																		Loading
																		FAQ
																		items...
																	</div>
																</div>
															) : faqItems &&
															  faqItems.length >
																	0 ? (
																showJson ? (
																	<pre className="bg-slate-900 p-4 rounded-lg text-sm text-slate-300 overflow-auto max-h-96 border border-slate-600">
																		{JSON.stringify(
																			faqItems,
																			null,
																			2
																		)}
																	</pre>
																) : (
																	<div className="space-y-4">
																		{faqItems.map(
																			(
																				item,
																				index
																			) => (
																				<Card
																					key={
																						item.id
																					}
																					className="bg-slate-700/50 border-slate-600"
																				>
																					<CardContent className="p-4">
																						<div className="flex justify-between items-start mb-2">
																							<h4 className="font-medium text-white text-sm">
																								Question{" "}
																								{index +
																									1}
																							</h4>
																							<Button
																								variant="ghost"
																								size="sm"
																								onClick={() =>
																									handleCopyFAQ(
																										item.question,
																										item.answer
																									)
																								}
																								className="text-slate-400 hover:text-white hover:bg-slate-600"
																							>
																								<Copy className="h-3 w-3" />
																							</Button>
																						</div>
																						<div className="space-y-2">
																							<div>
																								<p className="text-sm font-medium text-slate-300 mb-1">
																									Q:
																								</p>
																								<p className="text-white text-sm">
																									{
																										item.question
																									}
																								</p>
																							</div>
																							<div>
																								<p className="text-sm font-medium text-slate-300 mb-1">
																									A:
																								</p>
																								<p className="text-slate-300 text-sm">
																									{
																										item.answer
																									}
																								</p>
																							</div>
																						</div>
																					</CardContent>
																				</Card>
																			)
																		)}
																	</div>
																)
															) : (
																<div className="text-center py-8">
																	<p className="text-slate-400">
																		No FAQ
																		items
																		found
																		for this
																		generation.
																	</p>
																</div>
															)}
														</div>
													</div>
												)}
											</DialogContent>
										</Dialog>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default FAQTable;
