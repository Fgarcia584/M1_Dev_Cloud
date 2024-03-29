import clientPromise from '/lib/mongodb';
import { ConfigService } from '/services/config.service';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db(ConfigService.mongo.db_name);
    if (req.method === 'POST') {
        const { token } = req.body;

        await db.collection(ConfigService.mongo.collections.user).findOne({ token: token }).then((user) => {
            if (user) {
                res.status(200).json({ status: 200, message: "Logged in", user: user });
            } else {
                res.status(401).json({ status: 401, error: "Unauthorized" });
            }
        });

    } else {
        res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}