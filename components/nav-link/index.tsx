"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

type Props = LinkProps & {
	activeClassName: string;
	exact?: boolean;
	children: React.ReactNode;
	className?: string;
};

const NavLink = forwardRef<HTMLAnchorElement, Props>(
	({ href, children, activeClassName, exact = false, ...props }, ref) => {
		const pathname = usePathname();

		const isActive = exact
			? pathname === href
			: pathname.startsWith(href as string);

		const combinedClassNames = cn(
			props.className,
			isActive ? activeClassName : ""
		);

		return (
			<Link
				href={href}
				ref={ref}
				className={combinedClassNames}
				{...props}
			>
				{children}
			</Link>
		);
	}
);

NavLink.displayName = "NavLink";

export default NavLink;
