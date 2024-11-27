import {getAuthUserId} from "@/app/actions/authActions";
import {getMemberByUserId} from "@/app/actions/memberActions";
import {notFound} from "next/navigation";
import {EditForm} from "@/app/members/edit/_components/EditForm";
import {CardInnerWrapper} from "@/components/CardInnerWrapper";


const MemberEditPage = async () => {

	const userId = await getAuthUserId();

	const member = await getMemberByUserId(userId);

	if (!member) return notFound();
	return (
		<CardInnerWrapper
			header="Edit Profile"
			body={<EditForm member={member}/>}
		/>
	);

};

export default MemberEditPage;