export const styles = {
    styledBox: {
        padding: 16,
        borderRadius: 16,
        overflowX: 'auto'
    },
    dataGrid: {
        '& .MuiDataGrid-cell': {
            alignItems: 'center',

        },
        '& .MuiDataGrid-columnHeader': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
        },
        '& .MuiDataGrid-footerContainer': {
            justifyContent: 'center',
        },
        '& .truncate-cell': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'block',
            minWidth: 0,
            maxWidth: '100%'
        },
        '& .actions-cell': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    fab: {
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
    }
};
