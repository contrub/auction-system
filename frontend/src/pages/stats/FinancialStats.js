import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, Typography } from '@mui/material';

import StatsService from "../../services/StatsService";

import '../../styles/DataGridStyles.css';

const FinancialStats = () => {
    const [stats, setStats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        StatsService.fetchFinancialStats()
            .then((data) => {
                setStats(data);
                console.log(data)
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const columns = [
        // { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', flex: 0.5 },
        { field: 'username', headerName: 'Username', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'firstName', headerName: 'First Name', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'lastName', headerName: 'Last Name', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'totalPayments', headerName: 'Payments', headerAlign: 'center', align: 'center', flex: 0.75 }
    ];

    if (isLoading) {
        return (
            <div className="loading-box">
                <CircularProgress />
            </div>
        );
    }

    if (!stats.length) {
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
                rows={stats}
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

export default FinancialStats;
