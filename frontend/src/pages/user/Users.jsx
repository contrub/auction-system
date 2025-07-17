import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {DataGrid} from '@mui/x-data-grid';
import {IconButton, Stack,} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import {styles} from '../../styles/gridStyles';
import paths from '../../routes/paths';
import {extractErrorMessage} from "../../utils/errorUtils";
import Loading from '../../components/Loading';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import UserService from '../../services/user/UserService';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        UserService.fetchUsers()
            .then((data) => setUsers(data))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (!isLoading && users.length === 0) {
            setError('No users found');
            setSnackbarOpen(true);
        }
    }, [isLoading, users.length]);

    const columns = [
        { field: 'username', headerName: 'Username', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'firstName', headerName: 'First name', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'lastName', headerName: 'Last name', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'balance', headerName: 'Balance', type: 'number', headerAlign: 'center', align: 'center', flex: 0.75 },
        {
            field: 'actions',
            headerName: 'Actions',
            headerAlign: 'center',
            align: 'center',
            flex: 0.75,
            cellClassName: 'actions-cell',
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1}>
                    <IconButton color="primary" onClick={() => navigate(paths.editUser(row.id))}>
                        <EditIcon />
                    </IconButton>
                </Stack>
            ),
        },
    ];

    if (isLoading) return <Loading/>;

    return (
        <div style={styles.styledBox}>
            <DataGrid
                rows={users}
                columns={columns}
                sx={styles.dataGrid}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 15 },
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

export default Users;
