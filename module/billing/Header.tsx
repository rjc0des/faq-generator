"use client";

import { getCheckoutURL } from "@/app/actions/actions";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";
import { toast } from "@/hooks/use-toast";
import { Crown } from "lucide-react";
import React from "react";

function Header() {
	const { isSubscribed } = useSubscription();

	const handleCreateCheckout = async () => {
		try {
			const url = await getCheckoutURL();
			console.log(url);

			// const { data, error } = await supabase.functions.invoke(
			// 	"create-lemon-checkout"
			// );

			// if (error) throw error;

			if (url) {
				window.open(url, "_blank");
			}
		} catch (error) {
			toast({
				title: "Error",
				description:
					"Failed to create checkout session. Please try again.",
				variant: "destructive",
			});
		}
	};

	return (
		<section className="flex items-center justify-between">
			<h1 className="text-3xl font-bold text-white">Billing & Usage</h1>
			{!isSubscribed() && (
				<Button
					onClick={handleCreateCheckout}
					className="bg-gradient-to-r from-lavender-600 to-lightblue-600 hover:from-lavender-700 hover:to-lightblue-700 text-white"
				>
					<Crown className="mr-2 h-4 w-4" />
					Upgrade to Pro
				</Button>
			)}
		</section>
	);
}

export default Header;
