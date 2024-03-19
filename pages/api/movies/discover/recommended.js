import { ConfigService } from "/services/config.service";
import clientPromise from "/lib/mongodb";
import fetch from "node-fetch";

/**
 * @swagger
 * /api/movies/discover/recommended:
 *   summary: Get recommended movies based on user likes
 *   get:
 *    description: Returns recommended movies based on user likes
 *    responses:
 *      200:
 *       description: Returns recommended movies
 */

export default async function handler(req, res) {

    const client = await clientPromise;
    const db = client.db(ConfigService.mongo.db_name);

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ConfigService.themoviedb.keys.API_TOKEN}`
        }
    };

    let recommendations = [];
    const user = await db.collection(ConfigService.mongo.collections.users).findOne({ id: 1 }).then(user => {
        let movie_liked_samples = [];
        for (let step = 0; step < 3; step++) {
            movie_liked_samples.push(user.likes[Math.floor(Math.random() * user.likes.length)]);
        }
        let count = 0;
        movie_liked_samples.map(async (movie_liked_sample) => {
            const url = `${ConfigService.themoviedb.urls.movie}/${movie_liked_sample}/recommendations`;
            console.log(url);
            const response = await fetch(url, options)
                .then(response => response.json())
                .catch(error => console.error('Error:', error));
            recommendations.push(response.results);
            count++;
            if (count === movie_liked_samples.length) {
                res.json({ status: 200, data: recommendations, method: req.method });
            }
        });
    })
}