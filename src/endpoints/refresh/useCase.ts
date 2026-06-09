import { RequestSuccess } from "./schema";
import { TokenFactory } from "@/utils/TokenFactory";

type RefreshTokenInputDTO = {
  refreshToken: string;
  requestIp: string;
};

export const useCase = async ({
  requestIp,
  refreshToken,
}: RefreshTokenInputDTO): Promise<RequestSuccess> => {
  const refresh = TokenFactory.decode(refreshToken, "refresh");

  //o ip de quem chama request deve ser o mesmo do refresh token
  if (requestIp !== refresh.ip) {
    throw new Error(
      "Token de acesso possui informações divergentes (ip) do refreshToken",
    );
  }

  const userId = refresh.id;

  const { generateAccessToken, generateRefreshToken } = new TokenFactory(
    userId,
  );

  const newAccessToken = generateAccessToken();
  const newRefreshToken = generateRefreshToken({ ip: requestIp });

  const response: RequestSuccess = {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };

  return response;
};
