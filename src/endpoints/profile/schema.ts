import z from "zod";

export const querySchema = z.object({
  email: z.email(),
});

export const requestErrorSchema = z.object({
  message: z.string(),
});

export const requestSuccessSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    createdAt: z.string(),
  }),
});

export type RequestQuery = z.infer<typeof querySchema>;
export type RequestSuccess = z.infer<typeof requestSuccessSchema>;
export type RequestError = z.infer<typeof requestErrorSchema>;
export type RequestReturn = RequestSuccess | RequestError;
