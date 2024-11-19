import {getMembers} from "@/app/actions/memberActions";
import {MemberCard} from "@/app/members/_components/MemberCard";
import {fetchCurrentUserLikeIds} from "@/app/actions/likeActions";

const MembersPage = async () => {
	const members = await getMembers();
	const likeIds = await fetchCurrentUserLikeIds();

	return (
		<div
			className={"mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8"}
		>
			{
				members &&
				members.map(member => (
					<MemberCard
						key={member.id}
						member={member}
						likeIds={likeIds}
					/>
				))
			}
		</div>

	);
};

export default MembersPage;