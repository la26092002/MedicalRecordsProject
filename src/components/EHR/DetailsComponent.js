import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../AppContext";

import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

const DetailsComponent = () => {
  // Access the ID from URL params
  let { id, addresse } = useParams();
  const [data, setdata] = useState([]);

  const [isDoctor, setIsDoctor] = React.useState(false);
  const [isHospital, seIsHospital] = React.useState(false);

  const { account, contract, provider } = useAppContext();
  useEffect(() => {
    const loadContract = async () => {
      if (!contract) {
        console.error("Contract is not initialized");
        return;
      }
      let record = await contract.displayMedicalRecords(addresse, id);
      //console.log(record)
      setdata(JSON.parse(record) || []);
      //console.log(JSON.parse(record))

      //is doctar is hospital
      let IsDoctor = await contract.isDoctor();
      setIsDoctor(IsDoctor);
      let IsHospital = await contract.isHospital();
      seIsHospital(IsHospital);
    };
    loadContract();
  }, [contract, id, addresse]);

  useEffect(() => {
    console.log(data);
    console.log("ggg");
  }, [data]);

  const [medicalHistory, setMedicalHistory] = useState("");
  const [CurrentMedications, setCurrentMedications] = useState("");
  const [ReasonVisit, setReasonVisit] = useState("");
  const [PhysicalExamination, setPhysicalExamination] = useState("");
  const [AssessmentPlan, setAssessmentPlan] = useState("");
  const [labResult, setLabResult] = useState("");

  const [addstate, setAddstate] = useState(false);

  return (
    <div>
      <Grid container spacing={2}></Grid>
      <h2>
        Details of Record with ID: {id} of {addresse}
      </h2>
      <Grid container spacing={2}>
        {(isDoctor || isHospital) && (
          <>
            <Grid item xs={12} md={12} mt={3}>
              <Button
                onClick={() => {
                  setAddstate(!addstate);
                }}
                variant="outlined"
                style={{ height: "100%" }}
                fullWidth
              >
                Add New Informations
              </Button>
            </Grid>
          </>
        )}

        {addstate && (
          <>
            <Grid item xs={12} md={6} mt={3}>
              <TextField
                id="outlined-basic"
                label="Medical History"
                value={medicalHistory}
                onChange={(e) => {
                  setMedicalHistory(e.target.value);
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} mt={3}>
              <TextField
                id="outlined-basic"
                label="Current Medications"
                value={CurrentMedications}
                onChange={(e) => {
                  setCurrentMedications(e.target.value);
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} mt={3}>
              <TextField
                id="outlined-basic"
                label="Reason for Visit"
                value={ReasonVisit}
                onChange={(e) => {
                  setReasonVisit(e.target.value);
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} mt={3}>
              <TextField
                id="outlined-basic"
                label="PhysicalExamination"
                value={PhysicalExamination}
                onChange={(e) => {
                  setPhysicalExamination(e.target.value);
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} mt={3}>
              <TextField
                id="outlined-basic"
                label="Assessment and Plan"
                value={AssessmentPlan}
                onChange={(e) => {
                  setAssessmentPlan(e.target.value);
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} mt={3}>
              <TextField
                id="outlined-basic"
                label="Lab Results"
                value={labResult}
                onChange={(e) => {
                  setLabResult(e.target.value);
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} mt={3} mb={3}>
              <Button
                onClick={async () => {
                  if (!ReasonVisit) {
                    alert("Please fill out all fields.");
                    return;
                  }
                  const loadContract = async () => {
                    if (!contract) {
                      console.error("Contract is not initialized");
                      return;
                    }
                    let record = await contract.displayMedicalRecords(
                      addresse,
                      id
                    );
                    let rr = JSON.parse(record);
                    let data = {
                      doctor: account,
                      hospitaAccount: "",
                      medicalHistory,
                      CurrentMedications,
                      ReasonVisit,
                      PhysicalExamination,
                      AssessmentPlan,
                      labResult,
                    };
                    rr.push(data);
                    await contract.ModifyEhr(addresse, id, JSON.stringify(rr));
                  };
                  loadContract();
                }}
                variant="outlined"
                style={{ height: "100%" }}
                fullWidth
              >
                Create EHR
              </Button>
            </Grid>
          </>
        )}

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
