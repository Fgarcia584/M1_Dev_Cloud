import bcrypt from 'bcrypt';
import { ConfigService } from '/services/config.service';
import clientPromise from '/lib/mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db(ConfigService.mongo.db_name);
    if (req.method === 'POST') {
        const { token } = req.body;
        try {
            // decode token and if it is valid, return user

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            if (decodedToken) {
                // Token is valid
                // You can access the user information from the decoded token
                const user = await db.collection(ConfigService.mongo.collections.users).findOne({ token: token });
                if (!user) {
                    res.status(404).json({ status: 404, error: "User not found" });
                    return;
                }
                res.status(200).json({ status: 200, token: token, user: user });
                return;
            } else {
                // Token is invalid
                res.status(401).json({ status: 401, error: "Invalid token" });
                return;
            }
            

        } catch (error) {
            console.error('Error signing in:', error);
            res.status(500).json({ status: 500, error: "Internal Server Error" });
            return;
        }
    }
    else {
        res.status(405).json({ status: 405, error: "Method Not Allowed" });
        return;
    }
}

