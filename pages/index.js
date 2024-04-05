import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Navbar from '../src/components/navbar';

import MoviesList from '../src/components/lists/movies';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/contexts/auth.context';

export default function Index() {

  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      console.log('Token', token);
      if (token) {
        await fetch('/api/auth/validate-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token}),
        }).then(async (res) => {
          if (res.status === 200) {
            const data = await res.json();
            console.log('User data', data);
            login({ userData: data.user, token });
          } else {
            localStorage.removeItem('token');
          }
        }).catch((error) => {
          console.error('Failed to validate token', error);
        });
      }
    };

    checkUser();
  }, []);

  return (
    <Container maxWidth={false} disableGutters={true} sx={{ backgroundColor: "#353535", minHeight:"2000px" }} >
      <Navbar />
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" sx={{ color: "white", ml: 2, mb: 2, mt: 4 }}>
          Trending Movies
        </Typography>
        <MoviesList/>
        <Typography variant="h4" component="h1" sx={{ color: "white", ml: 2, mb: 2, mt: 4 }}>
          Trending Movies 2
        </Typography>
        <MoviesList/>
        <Typography variant="h4" component="h1" sx={{ color: "white", ml: 2, mb: 2, mt: 4 }}>
          Trending Movies 3
        </Typography>
        <MoviesList/>
      </Box>
    </Container>
  );
}