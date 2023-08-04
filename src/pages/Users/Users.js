import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { userService } from "../../services/userService";
import { useEffect, useState, useRef } from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { NavLink, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { GridActionsCellItem} from '@mui/x-data-grid-pro';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import dateFormat from 'dateformat';

export default function Users() {
  let navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const flag = useRef(false)
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'birthday',
      headerName: 'Date birthday',
      type: 'datetime',
      width: 160,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    if(flag.current === false){
      userService.getAllUsers()
        .then(res => {
            let newUsers = []
            let data = res.data["hydra:member"]
            data.forEach( obj =>
              newUsers = [...newUsers, {
                  id: obj.id,
                  lastName: obj.lastname,
                  firstName: obj.firstname,
                  birthday: dateFormat(obj.dateCreation, "yyyy/MM/dd")
                }
              ]
            )
            setUsers(newUsers)
        })
        .catch(error => console.log(error))
    }

    return () => flag.current = true
  }, []);

  const handleCancelClick = (id) => () => {
    console.log(id);
    console.log("handleCancelClick");
    //<Link to={`/admin/user/edit/${user.id}`}>{user.id}</Link>
    userService.deleteUser(id)
        .then(res => {
          navigate("/users", {replace: true})
        })
        .catch(err => console.log(err))
  };

  const handleEditClick = (id) => () => {
    console.log(id);
    console.log("handleEditClick");
    if(id){
      navigate("/user/update/"+id, {replace: true})
    }
  };

  const onRowSelectionModelChange = (newRowSelectionModel) => {
      console.log(newRowSelectionModel);
  }

  return (
    <div className= "Users" style={{ height: 400, width: '100%' }}>
    <Container maxWidth={false}>
      <h1>List of users </h1>
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end" >
        <NavLink to="/user/add" >
          <Button variant="contained" endIcon={<SendIcon />}>
            Add user
          </Button>
        </NavLink>
      </Box>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 8]}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          onRowSelectionModelChange(newRowSelectionModel)
        }}
      />
    </Container>
    </div>
  );
}