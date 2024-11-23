import {AiFillDelete, AiOutlineDelete} from "react-icons/ai";
import {PiSpinner} from "react-icons/pi";


type Props = {
	loading: boolean;
}

export const DeleteButton = ({loading}: Props) => {


	return (
		<div
			className={"relative hover:opacity-80 transition cursor-pointer"}
		>
			{
				!loading ? (
					<>
						<AiOutlineDelete size={32} className={"fill-white absolute -top-[2px] -right-[2px]}/>"}/>
						<AiFillDelete size={28} className={"fill-red-600"}/>
					</>
				) : (
					<PiSpinner size={32} className={"fill-white animate-spin"}/>
				)
			}
		</div>
	);
};