import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import service from "./service";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Home() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState(null);

  const handleClickOpen = (updateTask) => {
    setOpen(true);
    setTask(updateTask);
  };

  const handleDelete = (task) => {
    service.delete(task);
    window.location.reload();
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var form = {
      id: task.id,
      title: data.get("title"),
      description: data.get("description"),
    };
    service.update(form);
    setOpen(false);
  };

  return (
    <TableContainer
      component={Paper}
      style={{ width: "90%", marginLeft: "4%" }}>
      <Box sx={{ m: 3 }}>
        <Link to="createissue">Create new task</Link>
      </Box>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Id</StyledTableCell>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <StyledTableRow key={task.id}>
              <StyledTableCell align="center">{task.id}</StyledTableCell>
              <StyledTableCell align="center">{task.title}</StyledTableCell>
              <StyledTableCell align="center">
                {task.description}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={() => handleClickOpen(task)}>
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(task)}>
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      {open &&
        <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update issue</DialogTitle>
        <DialogContent>
          <DialogContentText>Click save to persist content.</DialogContentText>
          <Box component="form" onSubmit={handleUpdate} noValidate>
          <Table>
            <TableBody>
              <TableRow>
              <TableCell>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Id"
                  disabled={true}
                  variant="standard"
                  value={task.id}
                  type="text"
                />
              </TableCell>
              <TableCell>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Title"
                  name="title"
                  variant="standard"
                  defaultValue={task.title}
                  type="text"
                />
              </TableCell>
              <TableCell>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Description"
                  name="description"
                  variant="standard"
                  defaultValue={task.description}
                  type="text"
                />
              </TableCell>
              </TableRow>
            </TableBody>
          </Table>
            <Button type="submit" variant="contained" sx={{float: 'right', mt: 5}}>Save</Button>
            <Button onClick={() => setOpen(false)} sx={{float: 'right', mt: 5}}>Cancel</Button>
          </Box>
        </DialogContent>
        </Dialog> }
    </TableContainer>
  );
}

export default Home;
