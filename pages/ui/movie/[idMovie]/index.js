'use client';
import { Box } from "@mui/material";
import Navbar from "../../../../src/components/navbar";
import MovieDetail from "../../../../src/components/movie";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";


export default function MovieDetailPage() {
    const router = useRouter();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!router.isReady) return;
        fetch(`/api/movies/${router.query.idMovie}`)
        .then((res) => res.json())
        .then((data) => {
            setMovie(data.data.movie);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [router.isReady]);

    useEffect(() => {
        console.log(movie);
    }, [movie]);


    return (
        <Box>
            <Navbar />
            {loading && <p>Loading...</p>}
            <MovieDetail movie={movie} />
        </Box>
    );
}