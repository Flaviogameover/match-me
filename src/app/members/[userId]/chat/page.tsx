import {CardBody, CardHeader, Divider,} from "@nextui-org/react";
import React from "react";

const ChatPage = () => {

	return (
		<>
			<CardHeader className={"text-2xl font-semibold text-default"}>
				Chat
			</CardHeader>
			<Divider/>
			<CardBody>Chat goes here</CardBody>
		</>
	);
};

export default ChatPage;