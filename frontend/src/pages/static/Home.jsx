import React from 'react';
import {useNavigate} from 'react-router-dom';

import {Box, Button, Container, Stack, Typography} from '@mui/material';

import paths from '../../routes/paths.js';
import {styles} from '../../styles/homeStyles.js';

const Home = () => {
  const navigate = useNavigate();

  return (
      <Box sx={styles.root}>
        <Container sx={styles.container}>
          <Box sx={styles.contentBox}>
            <Typography variant="h3" component="h1" sx={styles.heading}>
              Welcome to Auction System
            </Typography>
            <Typography variant="h6" sx={styles.subheading}>
              Your premier platform for discovering, bidding, and winning exclusive items
            </Typography>

            <Stack {...styles.buttonStack}>
              <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate(paths.login)}
              >
                Login
              </Button>
              <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => navigate(paths.signup)}
              >
                Sign Up
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
  );
};

export default Home;
