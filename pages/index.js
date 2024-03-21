import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../src/theme/mui-base-components/ProTip';
import Link from '../src/theme/mui-base-components/Link';
import Copyright from '../src/theme/mui-base-components/Copyright';
import Navbar from '../src/components/navbar';

import { useEffect } from 'react';
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
    <Container maxWidth={false} disableGutters={true} >
      <Navbar />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI - Next.js example
        </Typography>
        <Link href="/ui/sign-in" color="secondary">
          Go to the Sign-In page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}