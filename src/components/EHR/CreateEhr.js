import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useAppContext } from "../../AppContext";
const CreateEhr = () => {
  const { account, contract, provider } = useAppContext();

  const [patientAddress, setPatientAddress] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [CurrentMedications, setCurrentMedications] = useState("");
  const [ReasonVisit, setReasonVisit] = useState("");
  const [PhysicalExamination, setPhysicalExamination] = useState("");
  const [AssessmentPlan, setAssessmentPlan] = useState("");
  const [labResult, setLabResult] = useState("");

  let data = {
    doctor: account,
    data: {},
  };

  return (
    <>
      <h1>Create EHR</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} mt={3}>
          <TextField
            id="outlined-basic"
            label="Patient Address"
            value={patientAddress}
            onChange={(e) => {
              setPatientAddress(e.target.value);
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
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
              if (!ReasonVisit || !patientAddress) {
                alert("Please fill out all fields.");
                return;
              }

              let data = {
                id:"1",
                doctor:"",
                hospitaAccount:"",
                medicalHistory,
                CurrentMedications,
                ReasonVisit,
                PhysicalExamination,
                AssessmentPlan,
                labResult,
              };
              console.log(JSON.stringify(data) + ",");
              contract.createEhr(
                JSON.stringify(data) 
              );
            }}
            variant="outlined"
            style={{ height: "100%" }}
            fullWidth
          >
            Create EHR
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateEhr;
