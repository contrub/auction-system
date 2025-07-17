export const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        px: 2
    },
    container: {
        width: '100%',
        maxWidth: 600,
        p: 3
    },
    avatar: {
        bgcolor: '#1976d2',
        width: 64,
        height: 64,
        margin: '0 auto 20px auto',
        boxShadow: 3
    },
    input: {
        mb: 2,
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px'
        }
    },
    passwordInput: {
        mb: 3,
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px'
        }
    },
    button: {
        mt: 2,
        py: 1.5,
        borderRadius: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        backgroundColor: '#1976d2',
        '&:hover': {
            backgroundColor: '#1565c0'
        }
    },
    linkText: {
        color: '#1976d2',
        textDecoration: 'none',
        fontWeight: 500
    }
};
