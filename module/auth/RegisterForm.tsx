"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { User, Mail, Lock, CheckCircle } from "lucide-react";

interface RegisterFormProps {
	onToggleMode: () => void;
}

const RegisterForm = ({ onToggleMode }: RegisterFormProps) => {
	const supabase = createClient();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		if (password.length < 6) {
			toast.error("Password must be at least 6 characters long");
			return;
		}

		setIsLoading(true);

		try {
			const redirectUrl = `${window.location.origin}/`;

			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: redirectUrl,
					data: {
						name: name,
					},
				},
			});

			if (error) {
				if (error.message.includes("User already registered")) {
					toast.error(
						"An account with this email already exists. Please sign in instead."
					);
				} else {
					toast.error(error.message);
				}
			} else {
				toast.success(
					"Account created successfully! Please check your email to verify your account."
				);
				onToggleMode(); // Switch to login form
			}
		} catch (error) {
			toast.error("An unexpected error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleRegister} className="space-y-6">
			<div className="space-y-2">
				<Label
					htmlFor="name"
					className="text-slate-300 flex items-center gap-2"
				>
					<User className="h-4 w-4" />
					Name
				</Label>
				<Input
					id="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
					placeholder="Enter your full name"
				/>
			</div>

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

			<div className="space-y-2">
				<Label
					htmlFor="confirmPassword"
					className="text-slate-300 flex items-center gap-2"
				>
					<CheckCircle className="h-4 w-4" />
					Confirm Password
				</Label>
				<Input
					id="confirmPassword"
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
					className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
					placeholder="Confirm your password"
				/>
			</div>

			<Button
				type="submit"
				disabled={isLoading}
				className="w-full bg-lavender-600 hover:bg-lavender-700 text-white"
			>
				{isLoading ? "Creating account..." : "Create Account"}
			</Button>

			<div className="text-center">
				<button
					type="button"
					onClick={onToggleMode}
					className="text-lavender-400 hover:text-lavender-300 text-sm"
				>
					Already have an account? Sign in
				</button>
			</div>
		</form>
	);
};

export default RegisterForm;
