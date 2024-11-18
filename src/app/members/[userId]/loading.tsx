import {Spinner} from "@nextui-org/react";

const Loading = () => {

	return (
		<div className={"flex justify-center items-center vertical-center"}>
			<Spinner
				label={"Loading..."}
				color={"default"}
			/>
		</div>
	);
};

export default Loading;