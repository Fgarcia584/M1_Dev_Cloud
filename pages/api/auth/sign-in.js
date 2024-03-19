import bcrypt from 'bcrypt';
import { ConfigService } from '/services/config.service';
import clientPromise from '/lib/mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db(ConfigService.mongo.db_name);
    if (req.method === 'POST') {
        const { email, password } = req.body;
        try {

            const user = await db.collection(ConfigService.mongo.collections.users).findOne({ email: email })

            if (!user) {
                res.status(404).json({ status: 404, error: "User not found" });
            }
             bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    res.status(500).json({ status: 500, error: "Internal Server Error" });
                }
                if (!result) {
                    res.status(401).json({ status: 401, error: "Unauthorized" });
                }
    
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24 * 1000
                });
                db.collection(ConfigService.mongo.collections.users).updateOne({ email: email }, { $set: { token: token } });
    
                res.status(200).json({ status: 200, token: token, user: user });
            });
            

        } catch (error) {
            console.error('Error signing in:', error);
        }
    }
    else {
        res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}

