import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import * as React from "react";

import Loading from "../components/Loading";
import UserService from "../services/UserService";

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'username',
        headerName: 'Username',
        width: 150
    },
    {
        field: 'first_name',
        headerName: 'First name',
        width: 150
    },
    {
        field: 'last_name',
        headerName: 'Last name',
        width: 150
    },
    {
        field: 'balance',
        headerName: 'Balance',
        type: 'number',
        width: 110
    }
];

class Users extends React.Component {
    state = {
        users: [],
        isLoading: false
    }

    componentDidMount = () => {
        this.setState({isLoading: true})

        UserService.fetchUsers()
            .then((data)=> {
                this.setState({users: data, isLoading: false})
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const {users, isLoading} = this.state

        if (isLoading) {
            return (
                <Loading/>
            )
        }

        return (
            <Box sx={{height: 600, width: '100%'}}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    // disableColumnSorting={true}
                    // disableDensitySelector={true}
                    filterMode={"server"}
                    onFilterModelChange={(res) => {
                        console.log(res)
                    }}
                    // checkboxSelection
                    // disableRowSelectionOnClick
                />
            </Box>
        );
    }
};

export default Users