import {fetchCurrentUserLikeIds, fetchLikedMembers} from "@/app/actions/likeActions";
import {ListsTab} from "@/app/lists/ListsTab";

const ListPage = async ({searchParams}: {
	searchParams: {
		type: string
	}
}) => {
	const likeIds = await fetchCurrentUserLikeIds();
	const members = await fetchLikedMembers(searchParams.type);

	return (
		<div>
			<ListsTab members={members} likeIds={likeIds}/>
		</div>
	);
};

export default ListPage;