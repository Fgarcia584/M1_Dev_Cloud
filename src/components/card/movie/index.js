import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { ConfigService } from "../../../../services/config.service";
import { useRouter } from "next/router";
import { CardActionArea } from "@mui/material";



function MovieCard(props) {
    const { movie } = props;
    const router = useRouter();

    const handleClick = () => {
        router.push(`/ui/movie/${movie.id}`);
    }

    return (
        <Box sx={{ height: "100%" }} >
            <Card sx={{ height: "100%", width: "15vw" }} >
                <CardActionArea onClick={handleClick} >
                    <CardMedia
                        component="img"
                        height="100%"
                        image={ConfigService.themoviedb.urls.posters + movie.poster_path}
                        alt="film poster"
                        width="100%"
                    />
                </CardActionArea>
            </Card>
        </Box>
    );
}

export default MovieCard;