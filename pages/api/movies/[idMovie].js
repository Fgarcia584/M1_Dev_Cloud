import fetch from "node-fetch";
import clientPromise from "/lib/mongodb";
import { ConfigService } from "/services/config.service";

/**
 * @swagger
 * /api/movies/{idMovie}:
 *   summary: Get movie by ID on TMDb
 *   get:
 *     summary: Get movie by ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the movie
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Movie not found
 *       405:
 *         description: Method not allowed
 */


export default async function handler(req, res) {

  const idMovie = parseInt(req.query.idMovie, 10);
  const url = ConfigService.themoviedb.urls.movie + '/' + idMovie;
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
    }
  };


  switch (req.method) {

    case "GET":
      const movie = await fetch(url, options)
        .then(r => r.json())
        .catch(err => console.error('error:' + err));


      if (movie) {
        res.json({ status: 200, data: { movie: movie } });
      } else {
        res.status(404).json({ status: 404, error: "Not Found" });
      }
      break;

    default:
      res.status(405).json({ status: 405, error: "Method Not Allowed" });
  }
}