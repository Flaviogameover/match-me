import {CldUploadButton, CloudinaryUploadWidgetResults} from "next-cloudinary";
import {HiPhoto} from "react-icons/hi2";


type Props = {
	onUploadImage: (
		result: CloudinaryUploadWidgetResults
	) => void;
}

export const ImageUploadButton = ({onUploadImage}: Props) => {


	return (
		<CldUploadButton
			
			options={{maxFiles: 1,folder: "/match-me"}}
			onSuccess={onUploadImage}
			signatureEndpoint={"/api/sign-image"}
			uploadPreset={"matchme-demo"}
			className={"flex items-center gap-2 border-2 border-default text-default rounded-lg py-2 px-4 hover:bg-default/10"}

		>
			<HiPhoto size={28}/>
			Upload new image
		</CldUploadButton>
	);

};