import {Alert, Snackbar} from "@mui/material";

const ErrorSnackbar = ({ open, onClose, message, duration = 6000 }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        (onClose || (() => {}))(event, reason);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default ErrorSnackbar;
