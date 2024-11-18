import {getMemberByUserId} from "@/app/actions/memberActions";
import {notFound} from "next/navigation";
import {CardBody, CardHeader, Divider} from "@nextui-org/react";

const MemberDetailedPage = async ({params}: {
	params: {
		userId: string;
	}
}) => {

	const member = await getMemberByUserId(params.userId);

	if (!member) return notFound();

	return (
		<>
			<CardHeader
				className={"text-2xl font-semibold text-default"}
			>
				Profile
			</CardHeader>
			<Divider/>
			<CardBody>
				{member.description}
			</CardBody>
		</>
	);
};

export default MemberDetailedPage;