"use server";

import * as z from 'zod'
import { LoginSchema } from '@/schemas'; 
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async(values: z.infer<typeof LoginSchema>) => {
    console.log("values", values);
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success) {
        return {error: "invalid fields"}
    }

    const {email , password} = validatedFields.data;

    try {
        console.log("logina ction", email, password);
        await signIn("credentials", {
            email, 
            password,
            // redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
        console.log("logina ction 2")
    } catch (error) {
        if(error instanceof AuthError) {
            switch(error.type){
                case "CredentialsSignin":
                    return {error: "Invalid credentials"}
                default:
                    return {error: "Something went wrong"}
            }
        }
        throw error;
    }
}