import React from "react";
import {CardInnerWrapper} from "@/components/CardInnerWrapper";
import {ChatForm} from "@/app/members/[userId]/chat/_components/ChatForm";
import {getMessageThread} from "@/app/actions/messageActions";
import {getAuthUserId} from "@/app/actions/authActions";
import {MessageBox} from "@/app/members/[userId]/chat/_components/MessageBox";

const ChatPage = async ({params}: { params: { userId: string } }) => {

	const messages = await getMessageThread(params.userId);
	const userId = await getAuthUserId();

	const body = (
		<div>
			{messages.length === 0
				? "No messages to display."
				: (
					<div>
						{messages.map((message) => (
							<MessageBox message={message} currentUserId={userId} key={message.id}/>
						))}
					</div>
				)
			}

		</div>
	);

	return (
		<CardInnerWrapper
			header="Chat"
			body={body}
			footer={<ChatForm/>}
		/>
	);
};

export default ChatPage;