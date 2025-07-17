import React from 'react';

import {Box, CircularProgress} from '@mui/material';

import {styles} from '../styles/components/loadingStyles';

const Loading = () => {
    return (
        <Box sx={styles.loadingBox}>
            <CircularProgress/>
        </Box>
    )
}

export default Loading;
