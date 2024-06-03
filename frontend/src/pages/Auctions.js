import React, { useState, useEffect } from "react";

import { CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import AuctionService from "../services/AuctionService";

import '../styles/DataGridStyles.css';

const redirect = (id) => {
    window.location.href = `/auctions/${id}`;
}

const Auctions = () => {
    const [auctions, setAuctions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleOpenClick = async (id) => {
        window.location.href = `/auction_lots/${id}`;
    };

    const handleDeleteClick = async (id) => {
        try {
            await AuctionService.deleteAuction({ id: id });
            setAuctions((prevAuctions) => prevAuctions.filter(auction => auction.id !== id));
        } catch (err) {
            console.error('Error deleting auction: ', err);
        }
    };

    useEffect(() => {
        AuctionService.fetchAuctions()
            .then((data) => {
                setAuctions(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const columns = [
        // { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', flex: 0.5 },
        { field: 'title', headerName: 'Title', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'description', headerName: 'Description', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'start_date', headerName: 'Start Date', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'end_date', headerName: 'End Date', headerAlign: 'center', align: 'center', flex: 0.75 },
        {
            field: "actions",
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            flex: 0.75,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1}>
                    <IconButton color="secondary" onClick={() => handleOpenClick(row.id)}>
                        <OpenInNewIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => redirect(row.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteClick(row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            ),
        }
    ];

    if (isLoading) {
        return (
            <div className="loading-box">
                <CircularProgress />
            </div>
        );
    }

    if (!auctions.length) {
        return (
            <div className="no-data-box">
                <Typography variant="h6">
                    No auctions found
                </Typography>
            </div>
        );
    }

    return (
        <div className="styled-box">
            <DataGrid
                className="data-grid"
                rows={auctions}
                columns={columns}
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
        </div>
    );
};

export default Auctions;
