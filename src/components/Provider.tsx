import {NextUIProvider} from "@nextui-org/react";
import {ReactNode} from "react";

type Props = {
	children: ReactNode;
}
export const Providers = ({children}: Props) => {


	return (
		<NextUIProvider>
			{children}
		</NextUIProvider>
	);

};