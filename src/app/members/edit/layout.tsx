import {ReactNode} from "react";
import {getMemberByUserId} from "@/app/actions/memberActions";
import {MemberSidebar} from "@/app/members/_components/MemberSidebar";
import {Card} from "@nextui-org/react";
import {notFound} from "next/navigation";

const Layout = async ({children, params}: { children: ReactNode, params: { userId: string } }) => {


	const member = await getMemberByUserId(
		params.userId
	);

	console.log(member)

	if (!member) return notFound();

	const basePath = `/members/${member.userId}`;
	const navLinks = [
		{name: "Profile", href: `${basePath}`},
		{
			name: "Photos",
			href: `${basePath}/photos`,
		},
		{name: "Chat", href: `${basePath}/chat`},
	];
	return (
		<div
			className={"grid grid-cols-12 gap-5 h-[80vh]"}>
			<div
				className={"col-span-3"}
			>
				<MemberSidebar member={member} navLinks={navLinks}/>
			</div>

			<div
				className={"col-span-9"}
			>
				<Card className={"w-full mt-10 h-[80vh]"}>
					{children}
				</Card>
			</div>
		</div>
	);

};


export default Layout;