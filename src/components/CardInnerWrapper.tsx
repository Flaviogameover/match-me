import {ReactNode} from "react";
import {CardBody, CardFooter, CardHeader, Divider} from "@nextui-org/react";


type Props = {
	header: ReactNode | string;
	body: ReactNode;
	footer?: ReactNode;
}

export const CardInnerWrapper = ({header, body, footer}: Props) => {

	return (
		<>
			<CardHeader>
				{
					typeof header === "string" ? (
						<div
							className={"text-2xl font-semibold text-default"}
						>
							{header}
						</div>
					) : (
						<>{header}</>
					)
				}
			</CardHeader>
			<Divider/>
			<CardBody>{body}</CardBody>
			{
				footer && (
					<CardFooter>{footer}</CardFooter>
				)
			}
		</>
	);
};