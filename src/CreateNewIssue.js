import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import service from "./service";

function CreateNewIssue(){

  const navigate = useNavigate();
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var form = {
      title: data.get("title"),
      description: data.get("description"),
    };
    
    service.create(form);
    navigate('/')
  };

    return(
        <Container component="main">
        <Box sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"}}
            
            style={{
            boxShadow: '-2px 3px 9px 0px rgb(0 0 0 / 26%)',
            padding: '15px',
            paddingBottom: '40px',
            borderRadius: '10px'}}>

          <Typography component="h1" variant="h5"> Create new issue </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Title"
                  name="title"
                  type="text" />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Description"
                  name="description"
                  type="text" />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained">Save</Button>
            </Box>
        </Box>
      </Container>
    )
}

export default CreateNewIssue;