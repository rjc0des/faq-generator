import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export interface FAQItem {
	id: string;
	question: string;
	answer: string;
	created_at: string;
	generation_id: string;
}

export const useFAQItems = (generationId: string | null) => {
	const supabase = createClient();
	return useQuery({
		queryKey: ["faq-items", generationId],
		queryFn: async () => {
			if (!generationId) return [];

			console.log("Fetching FAQ items for generation:", generationId);

			const { data, error } = await supabase
				.from("faq_items")
				.select("*")
				.eq("generation_id", generationId)
				.order("created_at", { ascending: true });

			if (error) {
				console.error("Error fetching FAQ items:", error);
				throw error;
			}

			console.log("FAQ items fetched:", data);
			return data as FAQItem[];
		},
		enabled: !!generationId,
	});
};
