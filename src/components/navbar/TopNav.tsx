import {Button, Navbar, NavbarBrand, NavbarContent} from "@nextui-org/react";
import Link from "next/link";
import {GiSelfLove} from "react-icons/gi";
import {NavLink} from "@/components/navbar/NavLink";
import {auth} from "@/auth";
import {UserMenu} from "@/components/navbar/UserMenu";

export const TopNav = async () => {
	const session = await auth();


	return (
		<Navbar className="bg-gradient-to-r from-pink-400 via-red-400 to-pink-600"
		        maxWidth="full"
		        classNames={{
			        item: [
				        "text-xl",
				        "text-white",
				        "uppercase",
				        "data-[active=true]:text-yellow-200"
			        ]
		        }}
		>
			<NavbarBrand as={Link} href="/">
				<GiSelfLove
					size={40}
					className="text-gray-200"
				/>
				<div className="font-bold text-3xl flex">
					<span className="text-gray-200">MatchMe</span>
				</div>
			</NavbarBrand>
			<NavbarContent justify={"center"}>
				<NavLink
					href={"/members"}
					label={"Matches"}
				/>
				<NavLink
					href={"/lists"}
					label={"Lists"}
				/>
				<NavLink
					href={"/messages"}
					label={"Messages"}
				/>

			</NavbarContent>
			<NavbarContent
				justify={"end"}
			>
				{
					session?.user ? (
						<UserMenu user={session.user}/>
					) : (
						<>
							<Button
								as={Link}
								href={"/login"}
								variant={"bordered"}
								className={"text-white"}
							>
								Login
							</Button>
							<Button
								as={Link}
								href={"/register"}
								variant={"bordered"}
								className={"text-white"}
							>
								Register
							</Button>
						</>
					)
				}
			</NavbarContent>
		</Navbar>
	);
};