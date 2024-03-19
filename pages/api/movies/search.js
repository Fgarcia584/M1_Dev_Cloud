import fetch from "node-fetch";
import { ConfigService } from "/services/config.service";

/**
 * @swagger
 * /api/movies/search:
 *   get:
 *     summary: Search for movies by their original, translated and alternative titles.
 *     description: Returns movies
 *     parameters:
 *      - in: query
 *        name: query
 *        required: true
 *        type: string 
 *        description: The movie title
 *     responses:
 *       200:
 *         description: Hello Movies
 */

export default async function handler(req, res) {
    const url = `${ConfigService.themoviedb.urls.search}/movie?query=${req.query.query}`;

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
}