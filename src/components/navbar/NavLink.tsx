"use client";

import {NavbarItem} from "@nextui-org/react";
import Link from "next/link";
import {usePathname} from "next/navigation";

type Props = {
	href: string;
	label: string;
}

export const NavLink = ({href, label}: Props) => {
	const pathname = usePathname();

	return (
		<NavbarItem isActive={pathname === href} as={Link} href={href}>
			<span>{label}</span>
			{
				href === "/messages" &&
                <span className={"ml-1"}>96</span>

			}
		</NavbarItem>
	);
};