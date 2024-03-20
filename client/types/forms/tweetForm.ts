import { z } from "zod"

export const tweetFormData = {
    tweetSchema: z.object({
        text: z.string().min(2, { message: "Твит не может быть пустым" }).max(140, { message: "Твит не должен превышать размера в 140 символов!" }),
        author: z.string()
    }),

    defaultValues: {
        text: "",
        author: "",
    }

}