import React from "react";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export const PatientInfo = () => {
  const [name, setName] = React.useState("");
  const [datebirth, setDatebirth] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phonenumber, setPhonenumber] = React.useState("");
  const [emergencycontact, setEmergencycontact] = React.useState("");
  return (
    <>
      <h1>Enter Your Informations</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} mt={3}>
          <TextField
            id="outlined-basic"
            label="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} mt={3}>
          <TextField
            id="outlined-basic"
            label="Date of Birth"
            variant="outlined"
            value={datebirth}
            onChange={(e) => {
              setDatebirth(e.target.value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} mt={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gender"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} mt={3}>
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} mt={3}>
          <TextField
            id="outlined-basic"
            label="Phone Number"
            value={phonenumber}
            onChange={(e) => {
              setPhonenumber(e.target.value);
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} mt={3}>
          <TextField
            id="outlined-basic"
            label="Emergency Contact"
            variant="outlined"
            value={emergencycontact}
            onChange={(e) => {
              setEmergencycontact(e.target.value);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} mt={3}>
          <Button
            onClick={() => {
              let data = {
                name,
                datebirth,
                gender,
                address,
                phonenumber,
                emergencycontact,
              };
              console.log(data);
            }}
            variant="outlined"
            style={{ height: "100%" }}
            fullWidth
          >
            Add Informations
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
