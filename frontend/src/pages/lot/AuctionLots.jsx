import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {DataGrid} from '@mui/x-data-grid';
import {Fab, IconButton, Stack, Divider} from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import InventoryIcon from '@mui/icons-material/Inventory';
import InboxIcon from '@mui/icons-material/Inbox';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import {styles} from '../../styles/gridStyles';
import paths from '../../routes/paths';
import {accessControl} from "../../utils/accessControl";
import {isExpiredDate} from '../../utils/dateUtils';
import {extractErrorMessage} from "../../utils/errorUtils";
import ErrorSnackbar from '../../components/ErrorSnackbar';
import Loading from "../../components/Loading";
import AuctionService from '../../services/auction/AuctionService';
import CategoryService from "../../services/category/CategoryService";

const AuctionLots = ({userRoles}) => {
    const [auctionLots, setAuctionLots] = useState([{
        id: 0,
        auctionId: 0,
        categoryId: 0,
        amount: 0,
        title: '',
        description: '',
    }]);
    const [categories, setCategories] = useState([{
        id: 0,
        title: '',
        description: '',
    }]);
    const [isAuctionExpired, setIsAuctionExpired] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { auctionID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        AuctionService.getAuction({ id: auctionID })
            .then((data) => setIsAuctionExpired(isExpiredDate(data.endDate)))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            });

        AuctionService.getAuctionLots({ id: auctionID })
            .then((data) => setAuctionLots(data))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            });
    }, [auctionID]);

    useEffect(() => {
        CategoryService.fetchCategories()
            .then((data) => setCategories(data))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
            .finally(() => setIsLoading(false));
    }, [isLoading]);

    useEffect(() => {
        if (!isLoading && auctionLots.length === 0) {
            setError('No auction lots found');
            setSnackbarOpen(true);
        }
    }, [auctionLots.length, isLoading]);

    const categoryMap = useMemo(() => {
        const map = {};
        categories.forEach(cat => {
            map[cat.id] = cat.title;
        });
        return map;
    }, [categories]);

    const columns = [
        { field: 'title', headerName: 'Title', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'description', headerName: 'Description', headerAlign: 'center', align: 'center', flex: 1, columnClassName: 'truncate-cell' },
        { field: 'category', headerName: 'Category', headerAlign: 'center', align: 'center', flex: 1,
            renderCell: ({ row }) => <div>{categoryMap[row.categoryId] || '-'}</div>
        },
        { field: 'amount', headerName: 'Amount', headerAlign: 'center', align: 'center', flex: 0.6 },
        { field: "actions", headerName: "Actions", headerAlign: "center", align: "center", flex: 0.9, cellClassName: 'actions-cell',
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1}>
                    {accessControl(userRoles, ["participant", "recruiter", "admin"]) && (
                        <>
                            <IconButton color="secondary"
                                        disabled={isAuctionExpired}
                                        onClick={() => navigate(paths.createBid(auctionID, row.id))}>
                                <PaidIcon />
                            </IconButton>
                            <IconButton color="primary"
                                        disabled={isAuctionExpired}
                                        onClick={() => navigate(paths.proposalCreate(auctionID, row.id))}>
                                <SpeakerNotesIcon />
                            </IconButton>
                        </>
                    )}
                    {accessControl(userRoles, ["recruiter", "admin"]) && (
                        <>
                            <Divider orientation="vertical" flexItem />
                            <IconButton color="primary"
                                        disabled={isAuctionExpired}
                                        onClick={() => navigate(paths.lotEdit(auctionID, row.id))}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="info"
                                        onClick={() => navigate(paths.proposalsLot(auctionID, row.id))}>
                                <InboxIcon />
                            </IconButton>
                            <IconButton color="primary"
                                        disabled={!isAuctionExpired}
                                        onClick={() => navigate(paths.createPayment(auctionID, row.id))}>
                                <EmojiEventsIcon />
                            </IconButton>
                        </>
                    )}
                    {accessControl(userRoles, ["recruiter", "admin"]) && (
                        <>
                            <Divider orientation="vertical" flexItem />
                            <IconButton color="info"
                                        disabled={isAuctionExpired}
                                        onClick={() => navigate(paths.lotBids(auctionID, row.id))}>
                                <InventoryIcon />
                            </IconButton>
                        </>
                    )}
                </Stack>
            ),
        }
    ];

    if (isLoading) return <Loading />;

    return (
        <div style={styles.styledBox}>
            <DataGrid
                rows={auctionLots}
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
            {accessControl(userRoles, ["admin"]) && (
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => navigate(paths.lotCreate(auctionID))}
                    sx={styles.fab}
                >
                    <AddIcon />
                </Fab>
            )}
            <ErrorSnackbar
                open={snackbarOpen}
                message={error}
            />
        </div>
    );
}

export default AuctionLots;