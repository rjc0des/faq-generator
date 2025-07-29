"use server";

import { configureLemonSqueezy } from "@/lib/lemonsqueezy";
import { createClient } from "@/lib/supabase/server";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

export async function getCheckoutURL(embed = false) {
	configureLemonSqueezy();

	const supabase = await createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	if (error || !user) {
		throw new Error("User is not authenticated.");
	}

	const checkout = await createCheckout(201390, 909769, {
		checkoutOptions: {
			embed,
			media: false,
			logo: !embed,
		},
		checkoutData: {
			email: user.email ?? undefined,
			custom: {
				user_id: user.id,
			},
		},
		productOptions: {
			redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
			receiptButtonText: "Go to Dashboard",
			receiptThankYouNote: "Thank you for signing up",
		},
	});

	return checkout.data?.data.attributes.url;
}
