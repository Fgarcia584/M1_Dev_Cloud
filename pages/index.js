import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Navbar from '../src/components/navbar';

import MoviesList from '../src/components/lists/movies';

// import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/contexts/auth.context';

export default function Index() {

  const { user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/ui/sign-in');
  //   }
  // }, [user, router]);

  return (
    <Container maxWidth={false} disableGutters={true} sx={{ backgroundColor: "#353535" }} >
      <Navbar />
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" sx={{ color: "white", ml: 2 }}>
          Trending Movies
        </Typography>
        <MoviesList />
      </Box>
    </Container>
  );
}