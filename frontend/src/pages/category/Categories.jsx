import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Fab, IconButton, Stack} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from "@mui/icons-material/Add";

import {styles} from '../../styles/gridStyles';
import paths from '../../routes/paths.js';
import {accessControl} from '../../utils/accessControl';
import {extractErrorMessage} from '../../utils/errorUtils';
import ErrorSnackbar from '../../components/ErrorSnackbar';
import Loading from '../../components/Loading';
import CategoryService from '../../services/category/CategoryService';

const Categories = ({userRoles}) => {
    const [categories, setCategories] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        CategoryService.fetchCategories()
            .then((data) => setCategories(data))
            .catch((err) => {
                const errorMessage = extractErrorMessage(err);
                setError(errorMessage);
                setSnackbarOpen(true);
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (!isLoading && categories.length === 0) {
            setError('No categories found');
            setSnackbarOpen(true);
        }
    }, [isLoading, categories.length]);

    const baseColumns = [
        { field: 'title', headerName: 'Title', headerAlign: 'center', align: 'center', flex: 0.5 },
        { field: 'description', headerName: 'Description', headerAlign: 'center', align: 'center', flex: 1 },
    ];

    const actionColumn = {
        field: "actions",
        headerName: "Actions",
        headerAlign: "center",
        align: "center",
        flex: 0.3,
        cellClassName: 'actions-cell',
        renderCell: ({ row }) => (
            <Stack direction="row" spacing={1}>
                {userRoles.includes("admin") && (
                    <IconButton
                        color="primary"
                        onClick={() => navigate(paths.editCategory(row.id))}
                    >
                        <EditIcon />
                    </IconButton>
                )}
            </Stack>
        ),
    };

    const columns = userRoles.includes("admin")
        ? [...baseColumns, actionColumn]
        : baseColumns;

    if (isLoading) return <Loading/>;

    return (
        <div style={styles.styledBox}>
            <DataGrid
                rows={categories}
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
            {accessControl(userRoles, ["recruiter", "admin"]) && (
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => navigate(paths.createCategory)}
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
};

export default Categories;
