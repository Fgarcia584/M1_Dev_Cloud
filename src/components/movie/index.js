import { Box, Typography, Chip } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useState, useEffect } from "react";
import { ConfigService } from "../../../services/config.service";
import { useAuth } from "../../contexts/auth.context";

function MovieDetail(props) {
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`/api/movies/${props.movie.id}/videos`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data.data);
        props.movie.videos = data.data;
        // console.log("props", props);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [props.movie.id]);



  const handleLike = async () => {
    await fetch(`/api/movies/${props.movie.id}/likes`, {
      method: 'PATCH',
      body: JSON.stringify({
        liked: !isLiked,
        user_id: user.userData._id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((data) => {
        if (user) {
          setIsLiked(user.likedMovies.includes(props.movie.id));
        } else {
          setIsLiked(false);
        }
        // console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        gap: 3,
        backgroundColor: "#353535",
        minHeight: "97vh",
        maxWidth: "100vw",
        overflow: "hidden",
      }}>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "flex-start", gap: 3, my: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 3, width: "30vw" }}>
          <Card sx={{ maxWidth: "35vw", height: "100%", border: "2px solid white", borderRadius: "15px", padding: "10px", backgroundColor: "#353535" }} >
            <CardMedia
              component="img"
              height="100%"
              image={ConfigService.themoviedb.urls.posters + props.movie.poster_path}
              alt="film poster"
              padding="10px"
              border="1px solid black"

            />
          </Card>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "flex-start", gap: 3, width: "60vw", border: "2px solid white", borderRadius: "15px", padding: "10px", backgroundColor: "#353535" }}>
          <Typography variant="h4" color="white" sx={{ textAlign: "center" }}>
            {props.movie.title}
          </Typography>

          {props.movie.genres && (
            <Typography variant="p" color="white" sx={{ textAlign: "center" }}>
              {props.movie.genres.map((genre) => {
                return <Chip key={genre.id} label={genre.name} color="primary" variant="outlined" sx={{ color: "white", mx: 0.5 }} />;
              })}
            </Typography>
          )}

          {isLiked ? (

            <FavoriteIcon onClick={handleLike} sx={{ color: "red", fontSize: 40, cursor: "pointer" }} />
          ) : (
            <FavoriteBorderIcon onClick={handleLike} sx={{ color: "white", fontSize: 40, cursor: "pointer" }} />
          )}


          <Typography variant="p" color="white" >
            {props.movie.overview}
          </Typography>
          <Typography variant="p" color="white" >
            Release Date: {props.movie.release_date}
          </Typography>
          <Typography variant="p" color="white" >
            Rating: {props.movie.vote_average} / 10
          </Typography>
          <Typography variant="p" color="white" >
            Runtime: {props.movie.runtime} minutes
          </Typography>
          <Typography variant="p" color="white" >
            Status: {props.movie.status}
          </Typography>
          <Typography variant="p" color="white" >
            Budget: {props.movie.budget} $
          </Typography>
          <Typography variant="p" color="white" >
            Revenue: {props.movie.revenue} $
          </Typography>

        </Box>

      </Box>

      {props.movie.videos && (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", gap: 3, width: "100vw", backgroundColor: "#353535", padding: 3, ml: 2 }}>
          <Typography variant="h5" color="white" sx={{ textAlign: "center" }}>
            Videos
          </Typography>
          <Box sx={{ display: 'inline-flex', flexDirection: 'row', width: '100vw', gap: 4, overflow: 'scroll', height: "100%", padding: 2, scrollbarWidth:'none' }}>

            {props.movie.videos && props.movie.videos.map((video) => {
              return (
                <Box key={video.id} sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 3, width: "30vw" }}>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </Box>
              );
            })}
          </Box>
        </Box>

      )}
    </Box>
  );
}

export default MovieDetail;