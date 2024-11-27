"use server";

import {ActionResult} from "@/types";
import {messageSchema, MessageSchema} from "@/lib/schemas/MessageSchema";
import {Message} from "@prisma/client";
import {getAuthUserId} from "@/app/actions/authActions";
import {prisma} from "@/lib/prisma";
import {mapMessageToMessageDto} from "@/lib/mappings";

export const createMessage = async (recipientUserId: string, data: MessageSchema): Promise<ActionResult<Message>> => {


	try {
		const userId = await getAuthUserId();

		const validated = messageSchema.safeParse(data);

		if (!validated.success) return {
			status: 'error',
			error: validated.error.errors
		};

		const {text} = validated.data;

		const message = await prisma.message.create({
			data: {
				text,
				recipientId: recipientUserId,
				senderId: userId
			}
		});

		return {
			status: 'success',
			data: message
		};
	} catch (e) {
		console.log("[CREATE_MESSAGE]", e);
		return {
			status: 'error',
			error: 'Something went wrong'
		};
	}

};

export const getMessageThread = async (recipientId: string) => {
	try {
		const userId = await getAuthUserId();
		const messages = await prisma.message.findMany({
			where: {
				OR: [
					{
						senderId: userId,
						recipientId,
						senderDeleted: false
					},
					{
						senderId: recipientId,
						recipientId: userId,
						recipientDeleted: false
					}
				]
			},
			orderBy: {
				created: 'asc'
			},
			select: {
				id: true,
				text: true,
				created: true,
				dateRead: true,
				sender: {
					select: {
						userId: true,
						name: true,
						image: true
					}
				},
				recipient: {
					select: {
						userId: true,
						name: true,
						image: true,
					}
				}
			}
		});

		if (messages.length > 0) {
			await prisma.message.updateMany({
				where: {
					senderId: recipientId,
					recipientId: userId,
					dateRead: null
				},
				data: {
					dateRead: new Date(),
				}
			});
		}

		return messages.map(message => mapMessageToMessageDto(message));
	} catch (e) {
		console.log("[GET_MESSAGE]", e);
		throw e;
	}
};

export const getMessagesByContainer = async (container: string) => {
	try {
		const userId = await getAuthUserId();
		const conditions = {
			[container === 'outbox' ? 'senderId' : 'recipientId']: userId,
			...(container === 'outbox' ? {
				senderDeleted: false
			} : {
				recipientDeleted: false
			})
		};

		const messages = await prisma.message.findMany({
			where: conditions,
			orderBy: {created: 'asc'},
			select: {
				id: true,
				text: true,
				created: true,
				dateRead: true,
				sender: {
					select: {
						userId: true,
						name: true,
						image: true
					}
				},
				recipient: {
					select: {
						userId: true,
						name: true,
						image: true
					}
				}
			}
		});

		return messages.map(message => mapMessageToMessageDto(message));
	} catch (e) {
		console.log("[GET_MESSAGE_CONTAINER]", e);
		throw e;
	}
};

export const deleteMessage = async (messageId: string, isOutbox: boolean) => {
	const selector = isOutbox ? 'senderDeleted' : 'recipientDeleted';

	try {
		const userId = await getAuthUserId();

		await prisma.message.update({
			where: {id: messageId},
			data: {
				[selector]: true
			}
		});

		const messagesToDelete = await prisma.message.findMany({
			where: {
				OR: [
					{
						senderId: userId,
						senderDeleted: true,
						recipientDeleted: true
					},
					{
						recipientId: userId,
						senderDeleted: true,
						recipientDeleted: true
					}
				]
			}
		});

		if (messagesToDelete.length > 0) {
			await prisma.message.deleteMany({
				where: {
					OR: messagesToDelete.map(m => ({id: m.id}))
				}
			});
		}
	} catch (e) {
		console.log("[DELETE_MESSAGE]", e);
		throw e;
	}
};