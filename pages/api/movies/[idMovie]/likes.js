import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from 'mongodb';
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
  const liked = req.body.liked;
  const user_id = req.body.user_id;

  const client = await clientPromise;
  const db = client.db(ConfigService.mongo.db_name);

  switch (req.method) {

    case "PATCH":

      const like = await db.collection(ConfigService.mongo.collections.likes).findOne({ idTMDB: idMovie });
      const user = await db.collection(ConfigService.mongo.collections.users).findOne({ _id: ObjectId(user_id) });
      let resMongo, data;

      if (!user) {
        res.status(404).json({ status: 404, error: "User not found" });
        return;
      }

      if (like) {
        resMongo = await db.collection(ConfigService.mongo.collections.likes).updateOne(
          { idTMDB: idMovie },
          { $inc: { likeCounter: liked ? 1 : -1 } }
        )

        if (liked) {
          await db.collection(ConfigService.mongo.collections.users).updateOne(
            { _id: ObjectId(user_id) },
            { $push: { likedMovies: idMovie } }
          ).then((res) => {
            console.log(res);
          })
        } else {
          await db.collection(ConfigService.mongo.collections.users).updateOne(
            { _id: ObjectId(user_id) },
            { $pull: { likedMovies: idMovie } }
          )
        }

        data = {
          action: 'likeCounter updated',
          idMovie: idMovie,
          matchedCount: resMongo.matchedCount,
          modifiedCount: resMongo.modifiedCount,
          liked: liked
        }
        res.status(201).json({ status: 201, data: data });
      } else {
        resMongo = await db.collection(ConfigService.mongo.collections.likes).insertOne(
          { idTMDB: idMovie, likeCounter: 1 }
        )

        if (liked) {
          await db.collection(ConfigService.mongo.collections.users).updateOne(
            { _id: ObjectId(user_id) },
            { $push: { likedMovies: idMovie } }
          ).then((res) => {
            console.log(res);
          })
        } else {
          await db.collection(ConfigService.mongo.collections.users).updateOne(
            { _id: ObjectId(user_id) },
            { $pull: { likedMovies: idMovie } }
          )
        }

        data = {
          action: 'likeCounter updated',
          idMovie: idMovie,
          insertedId: resMongo.insertedId
        }
        res.status(201).json({ status: 201, data: data });
      }

      break;

    case "GET":

      const likes = await db.collection("likes").findOne({ idTMDB: idMovie });
      res.json({ status: 200, data: { likes: likes } });
      break;

    default:
      res.status(405).json({ status: 405, error: "Method Not Allowed" });
  }
}