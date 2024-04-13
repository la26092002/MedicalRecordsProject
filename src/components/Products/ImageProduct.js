import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const ImageProduct = () => {
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);

  const handleAdd = () => {
    if (file.trim() !== "") {
      // Check if color is not empty or just whitespace
      setFiles((prevfiles) => [...prevfiles, file]); // Append the new color to the colors array
      setFile(""); // Clear the color input field after adding
    }
  };
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleDelete = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8} md={8}>
          <TextField
            id="outlined-basic"
            type="file"
            accept="image/*"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={4} md={4}>
          <Button
            onClick={handleAdd}
            variant="text"
            style={{ height: "100%" }}
            fullWidth
          >
            Add Image
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
              {files.map((file, index) => (
                <tr key={index}>
                  <td> <img width="100%" height="100%" src={file} /></td>
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

export default ImageProduct;
