export const styles = {
    container: {
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflowX: 'hidden',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // Две колонки
        gap: '24px',
        width: '100%',
        maxWidth: '1400px',
    },
    chartWrapper: {
        width: '100%',
        height: '100%',
        minWidth: 0,
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        padding: '8px',
        boxSizing: 'border-box',
    }
};
