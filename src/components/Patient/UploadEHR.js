import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

import { useAppContext } from "../../AppContext";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const UploadEHR = () => {
  const [isData, setIsData] = useState(false);
  const [EHR, setEHR] = useState([]);

  const [circularProgress, setCircularProgress] = React.useState(false);

  

  const { account, contract, provider } = useAppContext();
  useEffect(() => {
    const loadContract = async () => {
      setCircularProgress(true);
      if (!contract) {
        console.error("Contract is not initialized");
        return;
      }

      let length = await contract.displayMedicalRecordsLength(account);
      //console.log(parseInt(length._hex, 16));
      setIsData(false);

      if (parseInt(length._hex, 16) > 0) {
        setIsData(true);
        let records = [];
        for (let i = 0; i < parseInt(length._hex, 16); i++) {
          let record = await contract.displayMedicalRecords(account, i);
          //console.log(record)
          // record = record.slice(0, -1); // Remove last character
          records.push(JSON.parse(record)); // Assuming record is already JSON
        }

        setEHR(records);
      }


      
      setCircularProgress(false);
    };

    loadContract();
  }, [contract]);

  useEffect(() => {
    console.log(EHR);
  }, [EHR]);

  return (
    <>
      <h2>Uploaded EHR Data</h2>
      {circularProgress && (
        <center>
          <CircularProgress />
        </center>
      )}
      {(!circularProgress || EHR.length > 0) && (
        <>
          <Grid container spacing={2}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>hospitaAccount</TableCell>
                    <TableCell>medicalHistory</TableCell>
                    <TableCell>CurrentMedications</TableCell>
                    <TableCell>ReasonVisit</TableCell>
                    <TableCell>doctor</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {EHR.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record[0].hospitaAccount}</TableCell>
                      <TableCell>{record[0].medicalHistory}</TableCell>
                      <TableCell>{record[0].CurrentMedications}</TableCell>
                      <TableCell>{record[0].ReasonVisit}</TableCell>
                      <TableCell>{record[0].doctor}</TableCell>
                      <TableCell>
                      <Link to={`/DetailsComponent/${record[0].id}/${account}`}>Details</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </>
      )}
    </>
  );
};

export default UploadEHR;
