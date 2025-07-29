export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	// Allows to automatically instanciate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: "12.2.3 (519615d)";
	};
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			faq_generations: {
				Row: {
					category: string;
					created_at: string;
					id: string;
					questions_count: number;
					title: string;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					category: string;
					created_at?: string;
					id?: string;
					questions_count?: number;
					title: string;
					updated_at?: string;
					user_id: string;
				};
				Update: {
					category?: string;
					created_at?: string;
					id?: string;
					questions_count?: number;
					title?: string;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [];
			};
			faq_items: {
				Row: {
					answer: string;
					created_at: string;
					generation_id: string;
					id: string;
					question: string;
				};
				Insert: {
					answer: string;
					created_at?: string;
					generation_id: string;
					id?: string;
					question: string;
				};
				Update: {
					answer?: string;
					created_at?: string;
					generation_id?: string;
					id?: string;
					question?: string;
				};
				Relationships: [
					{
						foreignKeyName: "faq_items_generation_id_fkey";
						columns: ["generation_id"];
						isOneToOne: false;
						referencedRelation: "faq_generations";
						referencedColumns: ["id"];
					}
				];
			};
			monthly_usage: {
				Row: {
					created_at: string;
					faq_generations_count: number;
					id: string;
					month: number;
					updated_at: string;
					user_id: string;
					year: number;
				};
				Insert: {
					created_at?: string;
					faq_generations_count?: number;
					id?: string;
					month?: number;
					updated_at?: string;
					user_id: string;
					year?: number;
				};
				Update: {
					created_at?: string;
					faq_generations_count?: number;
					id?: string;
					month?: number;
					updated_at?: string;
					user_id?: string;
					year?: number;
				};
				Relationships: [];
			};
			profiles: {
				Row: {
					created_at: string | null;
					email: string;
					id: string;
					name: string;
					updated_at: string | null;
				};
				Insert: {
					created_at?: string | null;
					email: string;
					id: string;
					name: string;
					updated_at?: string | null;
				};
				Update: {
					created_at?: string | null;
					email?: string;
					id?: string;
					name?: string;
					updated_at?: string | null;
				};
				Relationships: [];
			};
			subscriptions: {
				Row: {
					billing_cycle: string | null;
					created_at: string;
					current_period_end: string | null;
					current_period_start: string | null;
					id: string;
					lemon_squeezy_customer_id: string | null;
					lemon_squeezy_subscription_id: string | null;
					plan_name:
						| Database["public"]["Enums"]["plan_name_enum"]
						| null;
					plan_price: number | null;
					status: Database["public"]["Enums"]["subscription_status"];
					trial_end: string | null;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					billing_cycle?: string | null;
					created_at?: string;
					current_period_end?: string | null;
					current_period_start?: string | null;
					id?: string;
					lemon_squeezy_customer_id?: string | null;
					lemon_squeezy_subscription_id?: string | null;
					plan_name?:
						| Database["public"]["Enums"]["plan_name_enum"]
						| null;
					plan_price?: number | null;
					status?: Database["public"]["Enums"]["subscription_status"];
					trial_end?: string | null;
					updated_at?: string;
					user_id: string;
				};
				Update: {
					billing_cycle?: string | null;
					created_at?: string;
					current_period_end?: string | null;
					current_period_start?: string | null;
					id?: string;
					lemon_squeezy_customer_id?: string | null;
					lemon_squeezy_subscription_id?: string | null;
					plan_name?:
						| Database["public"]["Enums"]["plan_name_enum"]
						| null;
					plan_price?: number | null;
					status?: Database["public"]["Enums"]["subscription_status"];
					trial_end?: string | null;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			get_faq_generations: {
				Args: Record<PropertyKey, never>;
				Returns: {
					id: string;
					title: string;
					category: string;
					questions_count: number;
					created_at: string;
					user_id: string;
				}[];
			};
		};
		Enums: {
			plan_name_enum: "pro plan" | "free plan";
			subscription_status:
				| "pending"
				| "active"
				| "past_due"
				| "canceled"
				| "expired";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
	keyof Database,
	"public"
>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
			DefaultSchema["Views"])
	? (DefaultSchema["Tables"] &
			DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
			Row: infer R;
	  }
		? R
		: never
	: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
	? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
			Insert: infer I;
	  }
		? I
		: never
	: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
	? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
			Update: infer U;
	  }
		? U
		: never
	: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
	? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
	: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
	? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
	: never;

export const Constants = {
	graphql_public: {
		Enums: {},
	},
	public: {
		Enums: {
			plan_name_enum: ["pro plan", "free plan"],
			subscription_status: [
				"pending",
				"active",
				"past_due",
				"canceled",
				"expired",
			],
		},
	},
} as const;
