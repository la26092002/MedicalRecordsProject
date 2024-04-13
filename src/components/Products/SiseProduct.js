import React, { useState } from "react";
import Grid from "@mui/material/Grid";

import CircleIcon from '@mui/icons-material/Circle';
import DeleteIcon from '@mui/icons-material/Delete';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const SiseProduct = () => {
  const [sise, setSise] = useState("");
  const [sises, setSises] = useState([]);
  const handleAdd = () => {
    if (sise.trim() !== "") {
      // Check if color is not empty or just whitespace
      setSises((prevsises) => [...prevsises, sise]); // Append the new color to the colors array
      setSise(""); // Clear the color input field after adding
    }
  };

  const handleDelete = (index) => {
    setSises((prevSises) => prevSises.filter((_, i) => i !== index));
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8} md={8}>
          <TextField
            id="outlined-basic"
            label="Sise"
            variant="outlined"
            type="text"
            value={sise}
            onChange={(e) => setSise(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4} md={4}>
          <Button onClick={handleAdd} variant="text" style={{height:"100%"}} fullWidth>
            Add Sise
          </Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <table>
            <thead>
              <tr>
                <th>Sise</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {sises.map((sise, index) => (
                <tr key={index}>
                  <td>{sise}</td>
                  <td><DeleteIcon onClick={() => handleDelete(index)}  style={{color:"red"}} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </>
  );
};

export default SiseProduct;
