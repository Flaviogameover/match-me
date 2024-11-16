"use server";

import {signIn, signOut} from '@/auth';
import {LoginSchema} from '@/lib/schemas/LoginSchema';
import {registerSchema, RegisterSchema} from '@/lib/schemas/RegisterSchema';
import {ActionResult} from '@/types';
import bcrypt from 'bcryptjs';
import {AuthError} from 'next-auth';
import {prisma} from "@/lib/prisma";
import {User} from "@prisma/client";

export const signInUser = async (data: LoginSchema): Promise<ActionResult<string>> => {
	try {
		await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false

		});

		return {
			status: 'success',
			data: 'Logged in successfully'
		};
	} catch (error) {
		console.log("[LOGIN_ERROR]", error);
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return {
						status: 'error',
						error: "Invalid Credentials"
					};
				default:
					return {
						status: 'error',
						error: "Something went wrong"
					};
			}
		} else {
			return {
				status: 'error',
				error: 'Something went wrong'
			};
		}
	}
};

export const signOutUser = async () => {
	await signOut({redirectTo: '/'});
};

export const registerUser = async (data: RegisterSchema): Promise<ActionResult<User>> => {
	try {
		const validated = registerSchema.safeParse(data);

		if (!validated.success) {
			return {
				status: 'error',
				error: validated.error.errors
			};
		}

		const {name, email, password} = validated.data;

		const hashPassword = await bcrypt.hash(password, 10);

		const existingUser = await prisma.user.findUnique({
			where: {email}
		});

		if (existingUser) return {
			status: 'error',
			error: 'User already exists'
		};

		const user = await prisma.user.create({
			data: {
				name,
				email,
				passwordHash: hashPassword
			}
		});

		return {
			status: 'success',
			data: user
		};

	} catch (error) {
		console.log("[REGISTER_ERROR]", error);
		return {
			status: 'error',
			error: 'Something went wrong'
		};
	}
};

export const getUserByEmail = async (email: string) => {
	return prisma.user.findUnique({where: {email}});
};

export const getUserById = async (id: string) => {
	return prisma.user.findUnique({where: {id}});
};