import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useAppContext } from "../../AppContext";

import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
export const AddHospital = () => {
    const [Hospitals, setHospitals] = React.useState([]);

    const [circularProgress, setCircularProgress] = React.useState(false);
  
    const [addresse, setAddresse] = React.useState("");
    const { account, contract, provider } = useAppContext();
  
    useEffect(() => {
      const display = async () => {
        if (contract) {
          setCircularProgress(true);
          setHospitals([]);
          const length = await contract.displayHospitalAccountLength();
          let doctorsData = []; // Array to collect all the data
          if (parseInt(length._hex, 16)>0) {
            for (let i = 0; i < parseInt(length._hex, 16); i++) {
              let data = await contract.displayHospitalAccount(i);
              doctorsData.push(data); // Push data into the array
            }
            setHospitals((prevDoctors) => [...prevDoctors, ...doctorsData]);
          }
         
          doctorsData = [];
          setCircularProgress(false);
        }
      };
      display();
    }, [contract]);
  return (
    <>
    <h1>Add Hospitals</h1>
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
              await contract.addHospitalAccount(addresse);
              console.log(data);
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

          {Hospitals.length > 0 && !circularProgress && (
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Addresse</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Hospitals.map((hospital, index) => (
                    <TableRow key={index}>
                      <TableCell>{hospital}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  )
}
