import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import { useAppContext } from "../../AppContext";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import CircularProgress from "@mui/material/CircularProgress";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
const AccesDoctor = () => {
  const [addresse, setAddresse] = React.useState("");
  const [circularProgress, setCircularProgress] = React.useState(false);

  const [Doctors, setDoctors] = React.useState([]);

  const { account, contract, provider } = useAppContext();

  useEffect(() => {
    const display = async () => {
      if (contract) {
        setCircularProgress(true);
        setDoctors([]);
        const length = await contract.displayaccessDoctorLength();
        let doctorsData = []; // Array to collect all the data
        for (let i = 0; i < parseInt(length._hex, 16); i++) {
          let data = await contract.getAccesDoctorAtIndex(account, i);
          doctorsData.push(data); // Push data into the array
        }
        setDoctors((prevDoctors) => [...prevDoctors, ...doctorsData]);
        doctorsData = [];
        setCircularProgress(false);
      }
    };
    display();
  }, [contract]);

  return (
    <>
      <h1>Doctors Access</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} mt={3}>
          <TextField
            id="outlined-basic"
            label="Addresse"
            value={addresse}
            onChange={(e) => {
              setAddresse(e.target.value);
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} mt={3}>
          <Button
            onClick={async () => {
              if (!addresse) {
                alert("Please fill out all fields.");
                return;
              }
              let data = {
                addresse,
              };
              await contract.accessDoctor(addresse);
            }}
            variant="outlined"
            style={{ height: "100%" }}
            fullWidth
          >
            Add Informations
          </Button>
        </Grid>
        <Grid item xs={12} md={6} mt={3}>
          {circularProgress && (
            <center>
              <CircularProgress />
            </center>
          )}
          {Doctors.length > 0 && !circularProgress && (
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Addresse</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Doctors.map((doctor, index) => (
                    <TableRow key={index}>
                      <TableCell>{doctor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default AccesDoctor;
