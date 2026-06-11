import z from "zod"

export const CongressSchema = z.enum(
    [
        "interno",
        "externo"
    ]
)