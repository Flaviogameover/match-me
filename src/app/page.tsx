import Image from "next/image";
import {Button} from "@nextui-org/react";

export default function Home() {
	return (
		<div>
			<h1>Hello</h1>
			<Button
				variant="bordered"
				color="danger"
				startContent={<p>Hi</p>}
			></Button>
		</div>
	);
}
