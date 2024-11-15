"use client";

import {Button, Card, CardBody, CardHeader, Input} from "@nextui-org/react";
import {GiPadlock} from "react-icons/gi";
import {useForm} from "react-hook-form";
import {loginSchema, LoginSchema} from "@/lib/schemas/LoginSchema";
import {zodResolver} from "@hookform/resolvers/zod";

export const LoginForm = () => {
	const {register, handleSubmit, formState: {isValid, errors, isSubmitting}} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		mode: "onTouched"
	});
	const onSubmit = (data: LoginSchema) => console.log(data);
	return (
		<Card className="w-3/5 mx-auto">
			<CardHeader className="flex flex-col items-center justify-center">
				<div className="flex flex-col gap-2 items-center text-default">
					<div className="flex flex-row items-center gap-3">
						<GiPadlock size={30}/>
						<h1 className="text-3xl font-semibold">Login</h1>
					</div>
					<p className="text-neutral-500">
						Welcome back to MatchMe!
					</p>
				</div>
			</CardHeader>
			<CardBody>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<Input
							defaultValue=""
							label="Email"
							variant="bordered"
							{...register("Email")}
							isInvalid={!!errors.Email}
							errorMessage={errors.Email?.message as string}
						/>
						<Input
							defaultValue=""
							label="Password"
							variant="bordered"
							type="password"
							{...register("Password")}
							isInvalid={!!errors.Password}
							errorMessage={errors.Password?.message as string}
						/>
						<Button
							fullWidth
							color="default"
							type="submit"
							isDisabled={!isValid}
							isLoading={isSubmitting}

						>
							Login
						</Button>
					</div>
				</form>
			</CardBody>
		</Card>
	);
};