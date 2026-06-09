import z from "zod";

export const requestBodySchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const requestErrorSchema = z.object({
  message: z.string(),
});

export const requestSuccessSchema = z.object({
  user: z.object({
    name: z.string(),
    email: z.email(),
  }),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type RequestBody = z.infer<typeof requestBodySchema>;
export type RequestSuccess = z.infer<typeof requestSuccessSchema>;
export type RequestError = z.infer<typeof requestErrorSchema>;
export type RequestReturn = RequestSuccess | RequestError;
