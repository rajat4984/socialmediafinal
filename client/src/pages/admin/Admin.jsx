import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [open, setOpen] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);

  useEffect(() => {
    const getAllUser = async () => {
      const response = await axios.get("/users/allUsers");
      const data = response.data;
      setAllUsers(data);
    };
    getAllUser();
  }, [allUsers]);

  const cardFlex = {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`, { userId: id });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Topbar />
      <Box sx={{ padding: "2em" }}>
        <Typography variant="h4" sx={{ margin: "1em 0" }}>
          All Users <BookIcon />
        </Typography>

        <Grid container spacing={3}>
          {allUsers.map((item) => {
            return (
              <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                    ></Typography>

                    <Box sx={cardFlex}>
                      <Typography variant="body2" color="text.secondary">
                        Username
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.username}
                      </Typography>
                    </Box>

                    <Box sx={cardFlex}>
                      <Typography variant="body2" color="text.secondary">
                        Email :
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.email}
                      </Typography>
                    </Box>

                    <Box sx={cardFlex}>
                      <Typography variant="body2" color="text.secondary">
                        User id :
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item._id}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleDelete(item._id)}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default Admin;
