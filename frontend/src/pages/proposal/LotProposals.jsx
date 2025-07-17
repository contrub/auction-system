import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {DataGrid} from '@mui/x-data-grid';

import {styles} from '../../styles/gridStyles';
import {extractErrorMessage} from "../../utils/errorUtils";
import ErrorSnackbar from '../../components/ErrorSnackbar';
import ProposalService from '../../services/proposal/ProposalService';

const LotProposals = () => {
    const { lotID } = useParams();
    const [lotProposals, setLotProposals] = useState([{
        id: 0,
        user: { username: "" },
        description: ""
    }]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        ProposalService.fetchLotProposals({ id: lotID })
            .then((data) => setLotProposals(data))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
            .finally(() => setIsLoading(false))
    }, [lotID]);

    useEffect(() => {
        if (!isLoading && lotProposals.length === 0) {
            setError('No lot proposal found');
            setSnackbarOpen(true);
        }
    }, [isLoading, lotProposals.length]);

    const columns = [
        { field: 'description', headerName: 'Description', headerAlign: 'center', align: 'center', flex: 0.6 }
    ];

    return (
        <div style={styles.styledBox}>
            <DataGrid
                rows={lotProposals}
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
            />
        </div>
    );
};

export default LotProposals;