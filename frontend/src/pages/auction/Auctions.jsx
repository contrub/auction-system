import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Fab, IconButton, Stack} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddIcon from '@mui/icons-material/Add';

import {styles} from '../../styles/gridStyles';
import paths from '../../routes/paths.js';
import {formatReadableDate} from '../../utils/dateUtils';
import {accessControl} from '../../utils/accessControl';
import {extractErrorMessage} from '../../utils/errorUtils';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import AuctionService from '../../services/auction/AuctionService';

const Auctions = ({userRoles}) => {
    const [auctions, setAuctions] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        AuctionService.fetchAuctions()
            .then((res) => setAuctions(res))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (!isLoading && auctions.length === 0) {
            setError('No auctions found');
            setSnackbarOpen(true);
        }
    }, [isLoading, auctions.length]);

    const columns = [
        { field: 'title', headerName: 'Title', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'description', headerName: 'Description', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'startDate', headerName: 'Start Date', headerAlign: 'center', align: 'center', flex: 1,
            renderCell: ({ row }) => formatReadableDate(row.startDate)
        },
        { field: 'endDate', headerName: 'End Date', headerAlign: 'center', align: 'center', flex: 0.75,
            renderCell: ({ row }) => row.endDate ? formatReadableDate(row.endDate) : '-'
        },
        { field: "actions", headerName: "Actions", headerAlign: "center", align: "center", flex: 0.75, cellClassName: 'actions-cell',
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1}>
                    <IconButton color="secondary"
                                onClick={() => navigate(paths.auctionLots(row.id))}>
                        <OpenInNewIcon />
                    </IconButton>
                    {accessControl(userRoles, ["admin"]) && (
                            <IconButton color="primary"
                                        onClick={() => navigate(paths.editAuction(row.id))}>
                                <EditIcon />
                            </IconButton>
                    )}
                </Stack>
            ),
        }
    ];

    return (
        <div style={styles.styledBox}>
            <DataGrid
                rows={auctions}
                columns={columns}
                sx={styles.dataGrid}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 15
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
            {userRoles.includes("admin") && (
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => navigate(paths.createAuction)}
                    sx={styles.fab}
                >
                    <AddIcon />
                </Fab>
            )}
            <ErrorSnackbar
                open={snackbarOpen}
                message={error}
                onClose={() => setSnackbarOpen(false)}
            />
        </div>
    );
};

export default Auctions;
