import { JWT_ALGORITHM, JWT_SECRET } from "env";
import jwt from "jsonwebtoken";

export interface IAccessTokenPayload {
  id: string;
}
export interface IRefreshTokenPayload {
  id: string;
  ip: string;
}

type decodeOptions = "access" | "refresh";

export class TokenFactory {
  constructor(private readonly userId: string) {
    this.userId = userId;
  }

  generateAccessToken = () => {
    const accessToken = jwt.sign({ id: this.userId }, JWT_SECRET, {
      expiresIn: 25,
      algorithm: JWT_ALGORITHM,
    });
    return accessToken;
  };

  generateRefreshToken = ({ ip }: { ip: string }) => {
    const refreshToken = jwt.sign({ id: this.userId, ip }, JWT_SECRET, {
      expiresIn: 100,
      algorithm: JWT_ALGORITHM,
    });
    return refreshToken;
  };

  //usa overloads pra inferir tipagem de retorno automaticamente baseado no valor de type
  static decode(token: string, type: "access"): IAccessTokenPayload;
  static decode(token: string, type: "refresh"): IRefreshTokenPayload;
  static decode(
    token: string,
    type: decodeOptions = "access",
  ): IAccessTokenPayload | IRefreshTokenPayload {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (type === "access") return decodedToken as IAccessTokenPayload;
    return decodedToken as IRefreshTokenPayload;
  }
}
