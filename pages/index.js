import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Navbar from '../src/components/navbar';

import MoviesList from '../src/components/lists/movies';
import SeriesList from '../src/components/lists/series';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/contexts/auth.context';

export default function Index() {

  const { login } = useAuth();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      console.log('Token', token);
      if (token) {
        try {
          const response = await fetch('/api/auth/sign-in-with-token', {
            method: 'POST',
            body: JSON.stringify({
              token: token
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(async (response) => {
            const data = await response.json();
            login(data.user, data.token);
            console.log('User', user);

          }).catch((error) => {
            console.error('Failed to sign in');
          });

        } catch (error) {
          console.error('Error signing in:', error);
        }
      }
    };

    checkUser();
  }, []);

  return (
    <Container maxWidth={false} disableGutters={true} sx={{ backgroundColor: "#353535", minHeight: "2000px" }} >
      <Navbar />
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" sx={{ color: "white", ml: 2, mb: 2, mt: 4 }}>
          Trending Movies
        </Typography>
        <MoviesList />
        <Typography variant="h4" component="h1" sx={{ color: "white", ml: 2, mb: 2, mt: 4 }}>
          Trending TV Shows
        </Typography>
        <SeriesList />
        <Typography variant="h4" component="h1" sx={{ color: "white", ml: 2, mb: 2, mt: 4 }}>
          Trending Movies 3
        </Typography>
        <MoviesList />
      </Box>
    </Container>
  );
}