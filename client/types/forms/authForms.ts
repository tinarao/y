import { z } from "zod"

export const registerForm = {
    formSchema: z.object({
        username: z.string().min(2).max(50),
        email: z.string().min(2).max(50),
        password: z.string().min(8, { message: "Пароль должен состоять минимум из 8 символов" }).max(50),
    }),

    defaultValues: {
        username: "",
        email: "",
        password: ""
    }
}

export const loginForm = {
    formSchema: z.object({
        email: z.string().min(2).max(50),
        password: z.string().min(8, { message: "Пароль должен состоять минимум из 8 символов" }).max(50),
    }),

    defaultValues: {
        email: "",
        password: ""
    }
}