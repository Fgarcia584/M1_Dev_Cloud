import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { ConfigService } from "../../../../services/config.service";
import { Router } from "next/router";
import { CardActionArea } from "@mui/material";



function MovieCard(props) {
    const { movie } = props;
    console.log(movie);


    return (
        <Box  >
            <Card sx={{ maxWidth: 345, height: "100%" }} >
                <CardActionArea href= {`/ui/movie/${movie.id}`} >
                    <CardMedia
                        component="img"
                        height="100%"
                        image={ConfigService.themoviedb.urls.posters + movie.poster_path}
                        alt="film poster"
                    />
                </CardActionArea>
            </Card>
        </Box>
    );
}

export default MovieCard;