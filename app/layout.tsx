import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster as Sonnar } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/components/provider/QueryProvider";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: "FAQ Generator",
	description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Inter({
	variable: "--font-inter",
	display: "swap",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<QueryProvider>
				<body className={`${geistSans.className} antialiased`}>
					<Sonnar />
					<Toaster />
					{children}
				</body>
			</QueryProvider>
		</html>
	);
}
