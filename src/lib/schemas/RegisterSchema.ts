import {z} from "zod";

export const registerSchema = z.object({
	Name: z.string().min(3),
	Email: z.string().email(),
	Password: z.string().min(6, {
		message: 'Password must be at least 6 characters',
	})
});

export type RegisterSchema = z.infer<typeof registerSchema>;