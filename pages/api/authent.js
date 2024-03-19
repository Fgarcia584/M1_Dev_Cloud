import clientPromise from "/lib/mongodb";
import { ConfigService } from "/services/config.service";

/**
 * @swagger
 * /api/authent:
 *   summary: Get user information or create a new user if not existing
 *   get:
 *     responses:
 *       200:
 *         description: Successful response with user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *       405:
 *         description: Method Not Allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 error:
 *                   type: string
 *   post:
 *     summary: Create a new user
 *     responses:
 *       201:
 *         description: Successful response with user creation message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 data:
 *                   type: string
 *       409:
 *         description: Conflict, user already existing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 error:
 *                   type: string
 *       405:
 *         description: Method Not Allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 error:
 *                   type: string
 */

export default async function handler(req, res) {
    
    const client = await clientPromise;
    const db = client.db(ConfigService.mongo.db_name);


    switch (req.method) {

        case "GET":

            const users = await db.collection(ConfigService.mongo.collections.users).findOne({id: 1});

            res.json({ status: 200, data: {user: users}, method: req.method });
            break;

        case "POST":
            const user = await db.collection(ConfigService.mongo.collections.users).findOne({id: 1});
            if (user) {
                res.status(409).json({ status: 409, error: "Conflict, user already existing" });
                return;
            }
            const newUser = {
                id: 1,
                name: "John",
                email: ""
            };

            await db.collection(ConfigService.mongo.collections.users).insertOne(newUser);

            res.status(201).json({ status: 201, data: "User succesfullfy created" });
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}