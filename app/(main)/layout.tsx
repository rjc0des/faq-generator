import SidebarLayout from "@/components/sidebar/SidebarLayout";

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<SidebarLayout>{children}</SidebarLayout>
		</>
	);
}
