"use client";

import React from "react";
import { Button } from "../ui/button";
import { Menu, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useProfile } from "@/hooks/use-profile";
import { Skeleton } from "../ui/skeleton";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

function Header() {
	const navigate = useRouter();
	const { isLoading, data: profile } = useProfile();
	const supabase = createClient();

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) toast.error("Some problem with logout");
		toast.success("Logout successful");
	};

	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
	return (
		<nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm fixed top-0 w-full z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center space-x-3">
						<Sparkles className="h-8 w-8 text-lavender-400" />
						<span className="text-xl font-bold text-white">
							FAQ Generator AI
						</span>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						<a
							href="#features"
							className="text-slate-300 hover:text-white transition-colors"
						>
							Features
						</a>
						<a
							href="#testimonials"
							className="text-slate-300 hover:text-white transition-colors"
						>
							Testimonials
						</a>

						<Button
							variant="ghost"
							onClick={() => navigate.push("/pricing")}
							className="text-slate-300 hover:text-white hover:bg-transparent"
						>
							Pricing
						</Button>
						{isLoading ? (
							<Skeleton className="w-12 h-5 rounded-sm" />
						) : !profile || JSON.stringify(profile) === "{}" ? (
							<>
								<Button
									variant="outline"
									onClick={() => navigate.push("/auth")}
									className="border-slate-600 text-slate-800 hover:bg-slate-800"
								>
									Sign In
								</Button>
								<Button
									onClick={() => navigate.push("/generator")}
									className="bg-lavender-600 hover:bg-lavender-700 text-white"
								>
									Try Free
								</Button>
							</>
						) : (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Avatar>
										<AvatarImage
											src="/placeholder1.svg"
											alt="Profile"
										/>
										<AvatarFallback className="bg-lavender-600 text-white text-sm uppercase">
											{profile.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem
										className="cursor-pointer"
										onClick={() =>
											navigate.push("/dashboard")
										}
									>
										Dashboard
									</DropdownMenuItem>
									<DropdownMenuItem
										className="cursor-pointer"
										onClick={() =>
											navigate.push("/profile")
										}
									>
										Profile
									</DropdownMenuItem>
									<DropdownMenuItem
										className="cursor-pointer"
										onClick={async () =>
											await handleLogout()
										}
									>
										Logout
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<Button
							variant="ghost"
							size="icon"
							onClick={() =>
								setIsMobileMenuOpen(!isMobileMenuOpen)
							}
							className="text-slate-300 hover:text-white"
						>
							{isMobileMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile Navigation Menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden border-t border-slate-700/50 bg-slate-900/90 backdrop-blur-sm">
						<div className="px-2 pt-2 pb-3 space-y-1">
							<a
								href="#features"
								className="block px-3 py-2 text-slate-300 hover:text-white transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Features
							</a>
							<a
								href="#testimonials"
								className="block px-3 py-2 text-slate-300 hover:text-white transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Testimonials
							</a>
							<Button
								variant="ghost"
								onClick={() => {
									navigate.push("/pricing");
									setIsMobileMenuOpen(false);
								}}
								className="w-full justify-start text-slate-300 hover:text-white"
							>
								Pricing
							</Button>
							<Button
								variant="outline"
								onClick={() => {
									navigate.push("/auth");
									setIsMobileMenuOpen(false);
								}}
								className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-800"
							>
								Sign In
							</Button>
							<Button
								onClick={() => {
									navigate.push("/generator");
									setIsMobileMenuOpen(false);
								}}
								className="w-full justify-start bg-lavender-600 hover:bg-lavender-700 text-white mt-2"
							>
								Try Free
							</Button>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}

export default Header;
