"use client";

import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, Edit, Save, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { useProfile } from "@/hooks/use-profile";
import { useSubscription } from "@/hooks/use-subscription";

const ProfilePage = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [saving, setSaving] = useState(false);
	const { subscription } = useSubscription();
	const { data: profile, isLoading, refetch } = useProfile();
	const [editData, setEditData] = useState({
		name: profile?.name || "",
		email: profile?.email || "",
	});

	const supabase = createClient();

	const handleSave = async () => {
		if (!profile) return;

		setSaving(true);
		try {
			const { error } = await supabase
				.from("profiles")
				.update({
					name: editData.name,
					email: editData.email,
					updated_at: new Date().toISOString(),
				})
				.eq("id", profile.id);

			if (error) {
				console.error("Error updating profile:", error);
				toast.error("Failed to update profile");
			} else {
				await refetch();
				// setProfile({
				// 	...profile,
				// 	name: editData.name,
				// 	email: editData.email,
				// });
				setIsEditing(false);
				toast.success("Profile updated successfully");
			}
		} catch (error) {
			console.error("Error:", error);
			toast.error("Failed to update profile");
		} finally {
			setSaving(false);
		}
	};

	const handleCancel = () => {
		if (profile) {
			setEditData({
				name: profile.name,
				email: profile.email,
			});
		}
		setIsEditing(false);
	};

	const formatDate = (dateString: string) => {
		if (!dateString.length) return "No Date";
		return format(new Date(dateString), "MMMM yyyy");
	};

	// const handleEditToggle = () => {
	// 	const email_container =
	// 		document.getElementsByClassName("email_container");
	// 	for (let i = 0; i <= 1; i++) {
	// 		const input = email_container.item(i)?.querySelector("input");
	// 		input?.classList.toggle("block");
	// 		const paragraph = email_container.item(i)?.querySelector("p");
	// 		paragraph?.classList.toggle("none");
	// 	}
	// 	// email_container?.childNodes.forEach((childNode) => {
	// 	// 	console.log(childNode);
	// 	// });
	// 	// viewEmailId?.classList.toggle("none");
	// };

	if (isLoading) {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-white">
							Profile
						</h1>
						<p className="text-slate-400 mt-1">
							Loading profile information...
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (!profile) {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-white">
							Profile
						</h1>
						<p className="text-slate-400 mt-1">
							Failed to load profile information
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-white">Profile</h1>
					<p className="text-slate-400 mt-1">
						Manage your account information and preferences
					</p>
				</div>
				<Button
					onClick={() => setIsEditing(!isEditing)}
					variant="outline"
					className="border-slate-600 text-slate-700 hover:bg-slate-800"
					disabled={saving}
				>
					{isEditing ? (
						<X className="h-4 w-4 mr-2" />
					) : (
						<Edit className="h-4 w-4 mr-2" />
					)}
					{isEditing ? "Cancel" : "Edit Profile"}
				</Button>
			</div>

			<div className="grid gap-8 md:grid-cols-2">
				{/* Profile Information */}
				<Card className="bg-slate-800/50 border-slate-700">
					<CardHeader>
						<div className="flex items-center space-x-4">
							<Avatar className="h-20 w-20">
								<AvatarImage
									src="/placeholder.svg"
									alt="Profile"
								/>
								<AvatarFallback className="bg-lavender-600 text-white text-xl uppercase">
									{profile.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col space-y-2">
								<CardTitle className="text-white text-xl">
									{profile.name}
								</CardTitle>
								<CardDescription className="text-slate-400">
									<Badge
										variant="secondary"
										className="bg-lavender-600/20 text-lavender-300 border-lavender-600/30 capitalize"
									>
										{subscription?.plan_name} Plan
									</Badge>
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-4">
							<div className="space-y-2 email_container">
								<Label
									htmlFor="name"
									className="text-slate-300 flex items-center gap-2"
								>
									<User className="h-4 w-4" />
									Full Name
								</Label>
								{isEditing ? (
									<Input
										id="name"
										value={editData.name}
										onChange={(e) =>
											setEditData({
												...editData,
												name: e.target.value,
											})
										}
										className="bg-slate-700 border-slate-600 text-white"
										disabled={saving}
									/>
								) : (
									<p className="text-white">{profile.name}</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="email"
									className="text-slate-300 flex items-center gap-2"
								>
									<Mail className="h-4 w-4" />
									Email
								</Label>
								{isEditing ? (
									<Input
										id="email"
										type="email"
										value={editData.email || profile.email}
										onChange={(e) =>
											setEditData({
												...editData,
												email: e.target.value,
											})
										}
										className="bg-slate-700 border-slate-600 text-white"
										disabled={saving}
									/>
								) : (
									<p className="text-white">
										{profile.email}
									</p>
								)}
							</div>
						</div>

						{isEditing && (
							<div className="pt-4 flex gap-2">
								<Button
									onClick={handleSave}
									className="bg-lavender-600 hover:bg-lavender-700"
									disabled={saving}
								>
									<Save className="h-4 w-4 mr-2" />
									{saving ? "Saving..." : "Save Changes"}
								</Button>
								<Button
									onClick={handleCancel}
									variant="outline"
									className="border-slate-600 text-slate-300 hover:bg-slate-800"
									disabled={saving}
								>
									Cancel
								</Button>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Account Details */}
				<Card className="bg-slate-800/50 border-slate-700">
					<CardHeader>
						<CardTitle className="text-white">
							Account Details
						</CardTitle>
						<CardDescription className="text-slate-400">
							Your account information and statistics
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 text-slate-300">
									<Calendar className="h-4 w-4" />
									Member Since
								</div>
								<span className="text-white">
									{formatDate(profile.created_at || "")}
								</span>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-slate-300">
									Current Plan
								</span>
								<Badge
									variant="secondary"
									className="bg-lavender-600/20 text-lavender-300 border-lavender-600/30 capitalize"
								>
									{subscription?.plan_name}
								</Badge>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-slate-300">
									FAQs Generated
								</span>
								<span className="text-white font-semibold">
									0
								</span>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-slate-300">
									This Month
								</span>
								<span className="text-white font-semibold">
									0
								</span>
							</div>
						</div>

						<div className="pt-4 border-t border-slate-700">
							<Button
								variant="outline"
								className="w-full border-slate-600 text-slate-700 hover:bg-slate-700 h-10"
							>
								View Billing Details
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ProfilePage;
