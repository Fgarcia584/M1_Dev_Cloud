export const ConfigService = {
    themoviedb: {
        urls : {
            discover: "https://api.themoviedb.org/3/discover/movie",
            movie: "https://api.themoviedb.org/3/movie",
            search: "https://api.themoviedb.org/3/search",
            trending: "https://api.themoviedb.org/3/trending/movie/week",
        },
        keys : {
            API_KEY: "62afbd90042e5e9a1150b43880ad0123",
            API_TOKEN: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MmFmYmQ5MDA0MmU1ZTlhMTE1MGI0Mzg4MGFkMDEyMyIsInN1YiI6IjY1ZTliNzVmNmJlYWVhMDE2Mzc5MzZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2Xtxd2KIZH9roLQ_opTPoU1ts3Tqi0O1S0GP5Sh8idw"
        }

    },
    mongo: {
        url: "mongodb://localhost:27017",
        db_name: "Cluster0",
        collections: {
            likes: "likes",
            users: "users"
        }
    }
};