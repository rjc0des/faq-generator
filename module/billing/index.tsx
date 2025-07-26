"use client";

import React from "react";
import { useSubscription } from "@/hooks/use-subscription";
import Header from "./Header";
import CurrentPlan from "./CurrentPlan";
import UsageStatistics from "./UsageStatistics";

const Billing = () => {
	const { loading } = useSubscription();

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<Header />

			{/* Current Plan */}
			<CurrentPlan />

			{/* Usage Statistics */}
			<UsageStatistics />
		</div>
	);
};

export default Billing;
