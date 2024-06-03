import React, { useState, useEffect } from "react";

import { CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import {DataGrid} from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import UserService from "../services/UserService";

import '../styles/DataGridStyles.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (id) => {
        window.location.href = `/users/${id}`;
    };

    const handleDeleteClick = async (id) => {
        try {
            await UserService.deleteUser({ id: id });
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    useEffect(() => {
        UserService.fetchUsers()
            .then((data) => {
                setUsers(data);
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
        { field: 'first_name', headerName: 'First name', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'last_name', headerName: 'Last name', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'balance', headerName: 'Balance', type: 'number', headerAlign: 'center', align: 'center', flex: 0.75 },
        {
            field: "actions",
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            flex: 0.75,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1}>
                    <IconButton color="primary" onClick={() => handleEditClick(row.id)}>
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

    if (!users.length) {
        return (
            <div className="no-data-box">
                <Typography variant="h6">
                    No users found
                </Typography>
            </div>
        );
    }

    return (
        <div className="styled-box">
            <DataGrid
                className="data-grid"
                rows={users}
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
            <Typography variant="subtitle1" style={{ marginTop: '20px', textAlign: 'center' }}>
                For financial statistics <a href="/financial-stats">click here</a>.
            </Typography>
        </div>
    );
};

export default Users;
