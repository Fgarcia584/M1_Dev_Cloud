import fetch from "node-fetch";
import { ConfigService } from "/services/config.service";

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get trending movies
 *     description: Retrieve a list of trending movies from The Movie Database (TMDb).
 *     responses:
 *       200:
 *         description: A list of trending movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: The status code.
 *                 method:
 *                   type: string
 *                   description: The HTTP method used.
 */

export default async function handler(req, res) {

    const url = ConfigService.themoviedb.urls.trending;

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