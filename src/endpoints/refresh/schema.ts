import z from "zod";

export const requestHeaderSchema = z.object({
  "refresh-token": z.string(),
});

export const requestErrorSchema = z.object({
  message: z.string(),
});

export const requestSuccessSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type RequestHeader = z.infer<typeof requestHeaderSchema>;
export type RequestSuccess = z.infer<typeof requestSuccessSchema>;
export type RequestError = z.infer<typeof requestErrorSchema>;
export type RequestReturn = RequestSuccess | RequestError;
