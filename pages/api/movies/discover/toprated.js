import fetch from "node-fetch";
import { ConfigService } from "/services/config.service";

/**
 * @swagger
 * /api/movies/discover/toprated:
 *   summary: Get top rated movies on TMDb
 *   get:
 *     description: Returns top rated movies
 *     responses:
 *       200:
 *         description: Returns top rated movies
*/
export default async function handler(req, res) {

    switch (req.method) {

        case "GET":

            const url = `${ConfigService.themoviedb.urls.movie}/top_rated`;

            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ConfigService.themoviedb.keys.API_TOKEN}`
                }
            };

            const response = await fetch(url, options)
                .then(response => response.json())
                .catch(error => console.error('Error:', error));

            res.json({ status: 200, data: response.results, method: req.method });
            break;

        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}