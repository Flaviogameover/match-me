"use client";

import {Member} from "@prisma/client";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Key, useTransition} from "react";
import {Tab, Tabs} from "@nextui-org/tabs";
import {LoadingComponent} from "@/components/Loading";
import {MemberCard} from "@/app/members/_components/MemberCard";

type Props = {
	members: Member[];
	likeIds: string[];
};

export const ListsTab = ({members, likeIds}: Props) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const tabs = [
		{
			id: "source",
			label: "Members I have liked"
		},
		{
			id: "target",
			label: "Members that liked me"
		},
		{
			id: "mutual",
			label: "Mutual likes"
		}
	];

	const handleTabChange = (key: Key) => {
		startTransition(() => {
			const params = new URLSearchParams(searchParams);
			params.set("type", key.toString());
			router.replace(`${pathname}?${params.toString()}`);
		});
	};

	return (
		<div className={"flex w-full flex-col mt-10 gap-5"}>
			<Tabs
				aria-label="Liked tabs"
				items={tabs}
				color={"default"}
				onSelectionChange={key => handleTabChange(key)}
			>
				{(item) => (
					<Tab key={item.id} title={item.label}>
						{
							isPending ? (
								<LoadingComponent/>
							) : (
								<>
									{
										members.length > 0 ?
											<div className={"grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8"}>
												{
													members.map(x => (
														<MemberCard
															member={x}
															likeIds={likeIds}
															key={x.id}
														/>
													))
												}
											</div>
											:
											(
												<div>No members for this filter</div>
											)
									}
								</>
							)
						}
					</Tab>
				)}
			</Tabs>
		</div>
	);

};