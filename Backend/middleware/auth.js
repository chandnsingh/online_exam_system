import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { 
        if (err) {
            return res.status(403).json({ 
                message: "Invalid or expired token. Please sign in again"
            });
        }
        
        req.user = decoded.user; 
        next();
    });
};

export default authenticationToken;