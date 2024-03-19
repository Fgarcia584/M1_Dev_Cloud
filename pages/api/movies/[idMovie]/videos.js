import fetch from "node-fetch";
import { ConfigService } from "/services/config.service";

/**
 * @swagger
 * /api/movies/{idMovie}/videos:
 *  summary: Get movie videos by id on TMDb
 *  get:
 *   description: Returns movie videos by id
 *   parameters:
 *     - in: path
 *       name: idMovie
 *       required: true
 *       type: integer
 *       description: The movie id 
 *   responses:
 *     200:
 *       description: Returns movie videos by id
 */

export default async function handler(req, res) {


    switch (req.method) {

        case "GET":

            const url = `${ConfigService.themoviedb.urls.movie}/${req.query.idMovie}/videos`;

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