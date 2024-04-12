export const ConfigService = {
    themoviedb: {
        urls : {
            discover: "https://api.themoviedb.org/3/discover/movie",
            movie: "https://api.themoviedb.org/3/movie",
            search: "https://api.themoviedb.org/3/search",
            trending: "https://api.themoviedb.org/3/trending/movie/week",
            posters:"https://image.tmdb.org/t/p/original",
            serie: "https://api.themoviedb.org/3/trending/tv/week",
        },
        keys : {
            API_KEY: process.env.API_KEY,
            API_TOKEN: process.env.API_TOKEN
        }

    },
    mongo: {
        url: process.env.MONGODB_URI,
        db_name: "Cluster0",
        collections: {
            likes: "likes",
            users: "users"
        }
    }
};