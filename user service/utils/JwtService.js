import jwt from 'jsonwebtoken'
import { JWT_EXPIRY, JWT_SECRECT } from '../configs/index.js';

class JwtService {
    // Sign token method
    static sign(payload, expiry = JWT_EXPIRY, secret = JWT_SECRECT) {
        return jwt.sign(payload, secret, { expiresIn: expiry })
    }

    // Verify token
    static verify(token, secret = JWT_SECRECT) {
        try {
            return jwt.verify(token, secret)
        } catch (error) {
            throw new Error("Token is invaild or expired")
        }
    }
}

export default JwtService;