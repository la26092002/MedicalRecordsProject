import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useAppContext } from "../../AppContext";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
const AccessHospital = () => {
  const [Hospitals, setHospitals] = React.useState([]);

  const [addresse, setAddresse] = React.useState("");
  const { account, contract, provider } = useAppContext();


  useEffect(() => {
    const display = async () => {
      if (contract) {
        setHospitals([]);
        const length = await contract.displayaccessHospitalLength();
        let doctorsData = []; // Array to collect all the data
        for (let i = 0; i < parseInt(length._hex, 16); i++) {
          let data = await contract.getAccesHospitalAtIndex(account, i);
          doctorsData.push(data); // Push data into the array
        }
        setHospitals((prevDoctors) => [...prevDoctors, ...doctorsData]);
        doctorsData = [];
      }
    };
    display();
  }, [contract]);
  return (
    <>
      <h1>Hospitals Access</h1>
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
              await contract.accessHospital(addresse);
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
        </Grid>
      </Grid>
    </>
  );
};

export default AccessHospital;
