import clientPromise from '/lib/mongodb';
import { ConfigService } from '/services/config.service';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db(ConfigService.mongo.db_name);
    const { email } = req.body;
    if (req.method === 'POST') {
        
        db.collection(ConfigService.mongo.collections.users).updateOne({ email: email }, { $unset: { token: "" } });
        res.status(200).json({ status: 200, message: "Logged out" });
    } else {
        res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}