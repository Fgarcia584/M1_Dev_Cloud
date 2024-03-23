import { Box } from "@mui/material";

function MovieDetail(props) {
  console.log("hello", props);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        gap: 3,
      }}>
      <div>Titre: {props.movie.title}</div>
    </Box>
  );
}

export default MovieDetail;