import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface ProfileData {
	id: string;
	name: string;
	email: string;
	created_at: string | null;
}

export const useProfile = () => {
	const supabase = createClient();

	return useQuery({
		queryKey: ["profile-data"],
		queryFn: async () => {
			try {
				const {
					error,
					data: { user },
				} = await supabase.auth.getUser();
				if (error) {
					throw new Error("User Not found");
				}

				const { data } = await supabase
					.from("profiles")
					.select("*")
					.eq("id", user?.id || "")
					.single();

				console.log(data);
				if (!data) return {} as ProfileData;

				return { ...data } as ProfileData;
			} catch (err) {
				return {} as ProfileData;
			}
		},
	});
};
