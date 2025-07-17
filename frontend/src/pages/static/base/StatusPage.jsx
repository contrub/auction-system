import React from 'react';
import {useLocation} from 'react-router-dom';

import {Box, Container, Typography} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import {styles} from '../../../styles/static/statusPageStyles';

const StatusPage = ({title, subtitlePrefix, defaultPathText}) => {
    const location = useLocation();
    const path = location.state?.from?.pathname || defaultPathText;

    return (
        <Box sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container maxWidth="md" sx={styles.container}>
                <Box sx={styles.box}>
                    <ErrorOutlineIcon sx={styles.icon} />
                    <Typography variant="h3" sx={styles.title}>
                        {title}
                    </Typography>
                    <Typography variant="h5" sx={styles.subtitle}>
                        {subtitlePrefix} {path}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default StatusPage;
