import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
// import jwt from 'jsonwebtoken';


const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: '1h',
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};