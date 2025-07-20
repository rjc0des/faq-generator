"use client";

import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarHeader,
	useSidebar,
} from "@/components/ui/sidebar";
import {
	BarChart3,
	FileText,
	CreditCard,
	Sparkles,
	User,
	ListChecks,
} from "lucide-react";
import NavLink from "../nav-link";

const menuItems = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: BarChart3,
	},
	{
		title: "FAQ Generator",
		url: "/generator",
		icon: FileText,
	},
	{
		title: "FAQ Management",
		url: "/faq-management",
		icon: ListChecks,
	},
	{
		title: "Billing",
		url: "/billing",
		icon: CreditCard,
	},
	{
		title: "Profile",
		url: "/profile",
		icon: User,
	},
];

const NavSidebar = () => {
	const { state } = useSidebar();
	const isCollapsed = state === "collapsed";

	return (
		<Sidebar className="bg-slate-900 border-r border-slate-800">
			<SidebarHeader className="border-b border-slate-800 p-4 bg-slate-900">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 bg-gradient-to-r from-lavender-600 to-lightblue-600 rounded-lg flex items-center justify-center">
						<Sparkles className="h-5 w-5 text-white" />
					</div>
					{!isCollapsed && (
						<div>
							<h2 className="font-semibold text-white">
								FAQ Generator
							</h2>
							<p className="text-xs text-slate-400">
								AI-Powered Tool
							</p>
						</div>
					)}
				</div>
			</SidebarHeader>

			<SidebarContent className="bg-slate-900">
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<NavLink
											href={item.url}
											exact
											className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-slate-300 hover:bg-slate-800 hover:text-white`}
											activeClassName="bg-lavender-600 text-white"
										>
											<item.icon className="h-5 w-5" />
											{!isCollapsed && (
												<span>{item.title}</span>
											)}
										</NavLink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};

export default NavSidebar;
