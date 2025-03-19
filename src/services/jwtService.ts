import jwt, { SignOptions } from 'jsonwebtoken';

const secretKey: string = 'chave-do-jwt';

export const jwtService = {
    signToken: (payload: string | object | Buffer, expiration: string): string => {
        const signOptions: SignOptions = {
            expiresIn: expiration as any // Força a aceitação como StringValue (use com cuidado)
        };
        return jwt.sign(payload, secretKey, signOptions);
    },

    verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
        jwt.verify(token, secretKey, callbackfn)
    }
};