# M1 Dev Web Ynov 2023-2024 : Dev Cloud

This is a course project designed to teach us how to work on a Web project from its initialization to its deployment using Cloud tools (Circle CI, Vercel, Mongo Atlas, etc...)

## Stack

This is a Next.JS project with an hosted mongoDB on Mongo Atlas and MaterialUI for fronted components.

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.
- `JWT_SECRET` - Your JWT secret key. You can generate one using a random string generator like [randomkeygen](https://randomkeygen.com/).
- `API_KEY` - Your API key for the [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started). You can obtain one by creating an account on their website.
- `API_TOKEN` - Your API token for the [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started). 


### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

You will either see a message stating "You are connected to MongoDB" or "You are NOT connected to MongoDB". Ensure that you have provided the correct `MONGODB_URI` environment variable.

When you are successfully connected, you can refer to the [MongoDB Node.js Driver docs](https://mongodb.github.io/node-mongodb-native/3.4/tutorials/collections/) for further instructions on how to query your database.

## API Documentation
If you want to know more about the API, you can check the Swagger documentation at [http://localhost:3000/swagger](http://localhost:3000/swagger) when the app is running on your pc, or on the deployed version [here](https://ynov-m1-dev-cloud-40e05wxpl-fabio-garcias-projects.vercel.app/swagger)
