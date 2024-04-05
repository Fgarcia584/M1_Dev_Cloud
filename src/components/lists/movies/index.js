import { Box } from "@mui/material";
import MovieCard from "../../card/movie";

import { useEffect, useState } from "react";

function MoviesList(props) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/movies')
            .then((res) => res.json())
            .then((data) => {
                setMovies(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <Box sx={{ display: 'inline-flex', flexDirection: 'row', width: '100vw', gap: 4, overflow: 'scroll', height: "100%", padding: 2, scrollbarWidth:'none' }} >
            {loading && <p>Loading...</p>}

            {movies.data && movies.data.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />
            })}
        </Box>
    );
}

export default MoviesList;
