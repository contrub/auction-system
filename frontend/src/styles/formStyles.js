export const styles = {
    container: {
        minHeight: '100vh',
        padding: '0 16px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        bgcolor: '#1976d2',
        width: 64,
        height: 64,
        margin: '0 auto 20px auto'
    },
    avatarIcon: {
        fontSize: 40
    },
    createButton: {
        flex: 1,
        marginLeft: '8px',
        marginRight: '8px',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        backgroundColor: '#1976d2',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#1565c0'
        }
    },
    saveButton: {
        flex: 1,
        marginLeft: '8px',
        marginRight: '8px',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        backgroundColor: '#2e7d32',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#1b5e20'
        }
    },
    deleteButton: {
        flex: 1,
        marginLeft: '8px',
        marginRight: '8px',
        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        backgroundColor: '#d32f2f',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#b71c1c'
        }
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '16px'
    }
};
