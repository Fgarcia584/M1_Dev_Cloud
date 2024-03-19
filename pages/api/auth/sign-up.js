import bcrypt from 'bcrypt';
import clientPromise from "/lib/mongodb";
import { ConfigService } from "/services/config.service";

/**
* @swagger
* /api/auth/sign-up:
*  post:
*   description: Sign up
*   parameters:
*      - in: body
*        name: email
*        required: true
*        type: string
*        description: The user email
*      - in: body
*        name: password
*        required: true
*        type: string
*        description: The user password
*   responses:
*     200:
*      description: Sign up
*     405: 
*      description: Method Not Allowed
*/

export default async function handler(req, res) {

    const client = await clientPromise;
    const db = client.db(ConfigService.mongo.db_name);

    if (req.method === 'POST') {
        const { email, password } = req.body;
        try {
            const hashed_password = await bcrypt.hash(password, 10);

            const user = await db.collection(ConfigService.mongo.collections.users).insertOne({ email: email, password: hashed_password });

            res.status(200).json({ status: 200, user: user });

        } catch (error) {
            console.error('Error signing up:', error);
        }
    } else {
        res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}