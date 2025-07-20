import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NavSidebar from ".";

interface SidebarLayoutProps {
	children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
	return (
		<SidebarProvider>
			<div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
				<NavSidebar />
				<main className="flex-1 flex flex-col">
					<header className="h-[73px] flex items-center px-6 border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
						<SidebarTrigger className="text-slate-300 hover:text-white" />
					</header>
					<div className="flex-1 p-6">{children}</div>
				</main>
			</div>
		</SidebarProvider>
	);
};

export default SidebarLayout;
