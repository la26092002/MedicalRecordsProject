import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//import Image from "./home.webp"; // Assuming home.webp is in the same directory
import "./style.css";
export default function Home() {
  return (
    <>
      <Grid container spacing={2} mt={5}>
        <Grid item xs={12} md={6}>
          <Box mt={3}>
            <Typography variant="h2">
              Welcome to <span style={{ color: "brown" }}>MED Platform,</span>
            </Typography>
            <Typography variant="h4">
              where your medical records are securely stored and easily
              accessible.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box mt={3}>
            <center>
              <img
                src="./file.jpg"
                alt="Home"
                style={{ width: "60%", borderRadius: "10%" }}
              />
            </center>
          </Box>
        </Grid>
      </Grid>
      <center style={{marginTop:"100px"}}>
        <p>© 2024 MED Platform. All rights reserved.</p>
      </center>
    </>
  );
}
