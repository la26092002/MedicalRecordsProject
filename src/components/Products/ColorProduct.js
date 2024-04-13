import React, { useState } from "react";
import Grid from "@mui/material/Grid";

import CircleIcon from '@mui/icons-material/Circle';
import DeleteIcon from '@mui/icons-material/Delete';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const ColorProduct = () => {
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);
  const handleAdd = () => {
    if (color.trim() !== "") {
      // Check if color is not empty or just whitespace
      setColors((prevColors) => [...prevColors, color]); // Append the new color to the colors array
      setColor(""); // Clear the color input field after adding
    }
  };

  const handleDelete = (index) => {
    setColors((prevColors) => prevColors.filter((_, i) => i !== index));
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8} md={8}>
          <TextField
            id="outlined-basic"
            label="Color"
            variant="outlined"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4} md={4}>
          <Button onClick={handleAdd} variant="text" style={{height:"100%"}} fullWidth>
            Add Color
          </Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <table>
            <thead>
              <tr>
                <th>Color</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {colors.map((color, index) => (
                <tr key={index}>
                  <td><CircleIcon style={{color:color}} /></td>
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

export default ColorProduct;
