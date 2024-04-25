"use server";

import * as z from 'zod'
import { RegisterSchema } from '@/schemas'; 
import bcrypt from 'bcrypt';

export const registerAction = async(values: z.infer<typeof RegisterSchema>) => {
    console.log("values", values);
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return {error: "invalid fields"}
    }

    const {name, email , password } = validatedFields.data;
    const hashed = await bcrypt.hash(password, 10);
    console.log("hashed password: ", hashed)
    return {success: "sent...."}
}