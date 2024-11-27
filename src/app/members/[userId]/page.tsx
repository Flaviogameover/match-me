import {getMemberByUserId} from "@/app/actions/memberActions";
import {notFound} from "next/navigation";
import {CardInnerWrapper} from "@/components/CardInnerWrapper";

const MemberDetailedPage = async ({params}: {
	params: {
		userId: string;
	}
}) => {

	const member = await getMemberByUserId(params.userId);

	if (!member) return notFound();

	return (
		<CardInnerWrapper header={"Profile"} body={member.description}/>
	);
};

export default MemberDetailedPage;