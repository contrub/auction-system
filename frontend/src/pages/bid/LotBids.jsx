import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {DataGrid} from '@mui/x-data-grid';

import {styles} from '../../styles/gridStyles';
import {extractErrorMessage} from '../../utils/errorUtils';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import BidService from "../../services/bid/BidService";

const LotBids = () => {
    const { lotID } = useParams();
    const [lotBids, setLotBids] = useState([{
        id: 0,
        amount: 0,
        userId: 0
    }]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        BidService.fetchLotBids({ id: lotID })
            .then((data) => setLotBids(data))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
            .finally(() => setIsLoading(false));
    }, [lotID]);

    useEffect(() => {
        if (!isLoading && lotBids.length === 0) {
            setError('No auction bids found');
            setSnackbarOpen(true);
        }
    }, [isLoading, lotBids.length]);

    const columns = [
        { field: 'amount', headerName: 'Amount', headerAlign: 'center', align: 'center', flex: 0.6 }
    ];

    return (
        <div style={styles.styledBox}>
            <DataGrid
                rows={lotBids}
                columns={columns}
                sx={styles.dataGrid}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 15,
                        },
                    },
                }}
                pageSizeOptions={[15]}
                disableDensitySelector
                disableColumnMenu
                disableColumnFilter
                disableColumnSelector
                disableColumnSorting
                disableRowSelectionOnClick
            />
            <ErrorSnackbar
                open={snackbarOpen}
                message={error}
                onClose={() => setSnackbarOpen(false)}
            />
        </div>
    );
};

export default LotBids;
