"use server";

import {auth} from "@/auth";
import {prisma} from "@/lib/prisma";
import {Photo} from "@prisma/client";

export const getMembers = async () => {
	const session = await auth();

	if (!session?.user) {
		return null;
	}

	try {
		return prisma.member.findMany({
			where: {
				NOT: {
					userId: session.user.id
				}
			}
		});
	} catch (e) {
		console.log("[GET_MEMBERS]", e);
		throw e;
	}

};

export const getMemberByUserId = async (userId: string) => {
	try {
		return prisma.member.findUnique({where: {userId}});
	} catch (e) {
		console.log("[GET_MEMBER_BY_USERID]", e);
	}
};

export const getMemberPhotosByUserId = async (userId: string) => {
	const member = await prisma.member.findUnique({
		where: {userId},
		select: {
			photos: true
		}
	});

	if(!member) return null;
	return member.photos.map(p=>p) as Photo[];
};