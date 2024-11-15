import {z} from "zod";

export const loginSchema = z.object({
	Email: z.string().email(),
	Password: z.string().min(6,{
		message: 'Password must be at least 6 characters',
	})
});

export type LoginSchema = z.infer<typeof loginSchema>;