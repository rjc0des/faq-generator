"use client";

import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface LoginFormProps {
	onToggleMode: () => void;
}

const LoginForm = ({ onToggleMode }: LoginFormProps) => {
	const supabase = createClient();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				toast.error(error.message);
			} else {
				toast.success("Successfully signed in!");
				navigate.replace("/dashboard");
			}
		} catch (error) {
			toast.error("An unexpected error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleLogin} className="space-y-6">
			<div className="space-y-2">
				<Label
					htmlFor="email"
					className="text-slate-300 flex items-center gap-2"
				>
					<Mail className="h-4 w-4" />
					Email
				</Label>
				<Input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
					placeholder="Enter your email"
				/>
			</div>

			<div className="space-y-2">
				<Label
					htmlFor="password"
					className="text-slate-300 flex items-center gap-2"
				>
					<Lock className="h-4 w-4" />
					Password
				</Label>
				<Input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
					placeholder="Enter your password"
				/>
			</div>

			<Button
				type="submit"
				disabled={isLoading}
				className="w-full bg-lavender-600 hover:bg-lavender-700 text-white"
			>
				{isLoading ? "Signing in..." : "Sign In"}
			</Button>

			<div className="text-center">
				<button
					type="button"
					onClick={onToggleMode}
					className="text-lavender-400 hover:text-lavender-300 text-sm"
				>
					Don't have an account? Sign up
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
