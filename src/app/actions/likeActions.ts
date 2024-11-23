"use server";

import {prisma} from "@/lib/prisma";
import {getAuthUserId} from "@/app/actions/authActions";

export const toggleLikeMember = async (targetUserId: string, isLiked: boolean) => {

	try {
		const userId = await getAuthUserId();

		if (isLiked) {
			await prisma.like.delete({
				where: {
					sourceUserId_targetUserId: {
						sourceUserId: userId,
						targetUserId
					}
				}
			});
		} else {
			await prisma.like.create({
				data: {
					sourceUserId: userId,
					targetUserId
				}
			});
		}
	} catch (e) {
		console.log("[TOGGLE_LIKE_MEMBER]", e);
		throw e;
	}
};

export const fetchCurrentUserLikeIds = async () => {
	try {
		const userId = await getAuthUserId();

		const likeIds = await prisma.like.findMany({
			where: {
				sourceUserId: userId
			},
			select: {
				targetUserId: true
			}
		});
		console.log({
			userId,
			likeIds
		})
		return likeIds.map(like => like.targetUserId);
	} catch (e) {
		console.log("[FETCH_CURRENT_USER_LIKE_IDS]", e);
		throw e;
	}
};

const fetchSourceLikes = async (userId: string) => {
	const sourceList = await prisma.like.findMany({
		where: {
			sourceUserId: userId
		},
		select: {
			targetMember: true
		}
	});

	return sourceList.map(x => x.targetMember);
};

const fetchTargetLikes = async (userId: string) => {
	const targetList = await prisma.like.findMany({
		where: {
			targetUserId: userId
		},
		select: {
			sourceMember: true
		}
	});

	return targetList.map(x => x.sourceMember);
};

const fetchMutualLikes = async (userId: string) => {
	const likedUsers = await prisma.like.findMany({
		where: {
			sourceUserId: userId
		},
		select: {
			targetUserId: true
		}
	});
	const likedIds = likedUsers.map(x => x.targetUserId);


	const mutualList = await prisma.like.findMany({
		where: {
			AND: [
				{
					targetUserId: userId
				},
				{
					sourceUserId: {
						in: likedIds
					}
				}
			]
		},
		select: {
			sourceMember: true
		}
	});

	return mutualList.map(x => x.sourceMember);
};

export const fetchLikedMembers = async (type = 'source') => {
	try {
		const userId = await getAuthUserId();

		switch (type) {
			case 'source':
				return await fetchSourceLikes(userId);
			case 'target':
				return await fetchTargetLikes(userId);
			case 'mutual':
				return await fetchMutualLikes(userId);
			default:
				return [];
		}
	} catch (e){
		console.log("[FETCH_LIKED_MEMBER]", e);
		throw e;
	}
};
