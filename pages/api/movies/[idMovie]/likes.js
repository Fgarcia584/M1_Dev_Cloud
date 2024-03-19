import clientPromise from "../../../../lib/mongodb";
import { ConfigService } from "../../../../services/config.service";

/**
 * @swagger
 * /api/movies/{idMovie}/likes:
 *  patch:
 *   description: Increment likeCounter by id
 *   parameters:
*      - in: path
*        name: idMovie
*        required: true
*        type: integer
*        description: The movie id
 *   responses:
 *     201:
 *      description: Increment likeCounter by id
 *     405: 
 *      description: Method Not Allowed
  *  get:
 *    description: Returns likeCounter by id
 *    parameters:
*       - in: path
*         name: idMovie
*         required: true
*         type: integer
*         description: The movie id
 *    responses:
 *       200:
 *        description: Returns likeCounter by id
 *       405:
 *        description: Method Not Allowed
 */

export default async function handler(req, res) {

  const idMovie = parseInt(req.query.idMovie, 10);

  const client = await clientPromise;
  const db = client.db(ConfigService.mongo.db_name);

  switch (req.method) {

    case "PATCH":

      const like = await db.collection("likes").findOne({idTMDB: idMovie});
      let resMongo, data;

      if (like) {
         resMongo = await db.collection("likes").updateOne(
           {idTMDB: idMovie},
           { $inc: { likeCounter : 1 } }
         )
         data = {
           action: 'likeCounter updated',
           idMovie: idMovie,
           matchedCount: resMongo.matchedCount,
           modifiedCount: resMongo.modifiedCount
         }
         res.status(201).json({ status: 201, data: data });
      } else {
        resMongo = await db.collection("likes").insertOne(
          {idTMDB: idMovie, likeCounter: 0}
        )
        data = {
          action: 'likeCounter updated',
          idMovie: idMovie,
          insertedId: resMongo.insertedId
        }
        res.status(201).json({ status: 201, data: data });
      }

      break;

    case "GET":

      const likes = await db.collection("likes").findOne({idTMDB: idMovie});
      res.json({ status: 200, data: { likes: likes } });
      break;

    default:
      res.status(405).json({ status: 405, error: "Method Not Allowed" });
  }
}