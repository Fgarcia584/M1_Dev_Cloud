import { Box } from "@mui/material";
import MovieCard from "../../card/movie";

import { useEffect, useState } from "react";

function SeriesList(props) {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/series')
            .then((res) => res.json())
            .then((data) => {
                setSeries(data);
                setLoading(false);
                // console.log( "series", data); 
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <Box sx={{ display: 'inline-flex', flexDirection: 'row', width: '100vw', gap: 4, overflow: 'scroll', height: "100%", padding: 2, scrollbarWidth:'none', "&:hover":{scrollbarWidth:'thin'} }} >
            {loading && <p>Loading...</p>}

            {series.data && series.data.map((serie) => {
                return <MovieCard key={serie.id} movie={serie} />
            })}
        </Box>
    );
}

export default SeriesList;
