import React from 'react';
import { Container, Typography, Button } from '@mui/material';

function Home() {
  return (
    <Container>
      <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>
        Welcome to Test Prep Academy
      </Typography>
      <Button variant="contained" color="primary">
        Get Started
      </Button>
    </Container>
  );
}

export default Home;
