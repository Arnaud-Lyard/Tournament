import jwt, { SignOptions } from 'jsonwebtoken';

export const signJwt = (payload: Object, options: SignOptions) => {
  const privateKey = process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY;
  console.log(privateKey);
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY;
    console.log('publickey', publicKey);
    const decoded = jwt.verify(token, publicKey) as T;
    console.log('decoded', decoded);

    return decoded;
  } catch (error) {
    return null;
  }
};
