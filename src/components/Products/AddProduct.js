import React from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ColorProduct from "./ColorProduct";
import SiseProduct from "./SiseProduct";
import ImageProduct from "./ImageProduct";


export const AddProduct = () => {
  const [categorie, setCategorie] = React.useState("");

  const handleChangeCat = (event) => {
    setCategorie(event.target.value);
  };
  return (
    <>
      <Typography variant="h5" component="h2">
        Add Product
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="outlined-basic"
            label="Price (DA)"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categorie}
              label="Categorie"
              onChange={handleChangeCat}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" component="h2">
            Color
          </Typography>
          <ColorProduct />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" component="h2">
            Size
          </Typography>
          <SiseProduct />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" component="h2">
            Image
          </Typography>
          <ImageProduct />
        </Grid>
      </Grid>
    </>
  );
};
