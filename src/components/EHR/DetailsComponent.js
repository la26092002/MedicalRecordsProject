import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../AppContext";

import Grid from "@mui/material/Grid";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Button } from "@mui/material";

const DetailsComponent = () => {
  // Access the ID from URL params
  let { id, addresse } = useParams();
  const [data, setdata] = useState([]);

  const { contract } = useAppContext();
  useEffect(() => {
    const loadContract = async () => {
      if (!contract) {
        console.error("Contract is not initialized");
        return;
      }
      let record = await contract.displayMedicalRecords(addresse, id);
      setdata(JSON.parse(record) || []);
      //console.log(JSON.parse(record))
    };
    loadContract();
  }, [contract, id, addresse]);

  useEffect(() => {
    console.log(data);
    console.log("ggg");
  }, [data]);

  return (
    <div>
      <h2>
        Details of Record with ID: {id} of {addresse}
      </h2>
      <Grid container spacing={2}>
      <Grid item xs={12} md={6} mt={3}>
      <Button
            variant="outlined"
            style={{ height: "100%" }}
            fullWidth
          >
            Add New Informations
          </Button>
      </Grid>
        <Grid item xs={12} md={12} mt={3}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>hospitaAccount</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Medical History</TableCell>
                  <TableCell>Current Medications</TableCell>
                  <TableCell>Reason for Visit</TableCell>
                  <TableCell>Physical Examination</TableCell>
                  <TableCell>Assessment & Plan</TableCell>
                  <TableCell>Lab Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.hospitaAccount}</TableCell>
                      <TableCell>{item.doctor}</TableCell>
                      <TableCell>{item.medicalHistory}</TableCell>
                      <TableCell>{item.CurrentMedications}</TableCell>
                      <TableCell>{item.ReasonVisit}</TableCell>
                      <TableCell>{item.PhysicalExamination}</TableCell>
                      <TableCell>{item.AssessmentPlan}</TableCell>
                      <TableCell>{item.labResult}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        
      </Grid>
    </div>
  );
};

export default DetailsComponent;
