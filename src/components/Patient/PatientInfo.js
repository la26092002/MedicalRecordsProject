import React, { useEffect, useState } from "react";

import { ethers } from "ethers";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { ABI, ContractAddress } from "../../constants/Constants";
import { useAppContext } from "../../AppContext";

export const PatientInfo = () => {
  const [name, setName] = React.useState("");
  const [datebirth, setDatebirth] = React.useState("2024-04-09");
  const [gender, setGender] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phonenumber, setPhonenumber] = React.useState("");
  const [emergencycontact, setEmergencycontact] = React.useState("");

  //Update InfosPersonal
  const [updateInfos, setUpdateInfos] = React.useState(false);
  const [isData, setIsData] = React.useState(false);
  //


  const [infosPersonal, setInfosPersonal] = useState({});

  const { account, contract, provider } = useAppContext();

  useEffect(() => {
    const loadContract = async () => {
      if (!contract) {
        console.error("Contract is not initialized");
        return;
      }
  
      let length = await contract.displayPersonalInfosLength(account);
      setIsData(false);
      if (parseInt(length._hex, 16) > 0) {
        setIsData(true);
        let data = await contract.displayPersonalInfos();
        let ddt = JSON.parse(data);
        setInfosPersonal(ddt);

        console.log("yes")
      }
    };

    loadContract();
  }, [contract]);

  return (
    <>
      <h1>Infos</h1>
      <Grid container spacing={2}>
        {
          isData && (
            <>
            <Grid item xs={12} md={6} mt={1}>
          <h3>Name: {infosPersonal.name}</h3>
          <h3>Date of Birth:{infosPersonal.datebirth}</h3>
          <h3>Gender:{infosPersonal.gender}</h3>
        </Grid>
        <Grid item xs={12} md={6} mt={1}>
          <h3>Address:{infosPersonal.address}</h3>
          <h3>Phone Number:{infosPersonal.phonenumber}</h3>
          <h3>Emergency Contact:{infosPersonal.emergencycontact}</h3>
        </Grid>
        </>
          )
        }
        <Grid item xs={12} md={6} mt={1}>
          <Button
            onClick={async () => {
              setUpdateInfos(!updateInfos);
            }}
            variant="outlined"
            style={{ height: "100%" }}
            fullWidth
          >
            Update Your Informations
          </Button>
        </Grid>
        
        
      </Grid>
      {updateInfos && (
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
                id="demo-simple-date"
                type="date"
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
            <Grid item xs={12} md={6} mt={3} mb={3}>
              <Button
                onClick={async () => {
                  if (
                    !name ||
                    !datebirth ||
                    !gender ||
                    !address ||
                    !phonenumber ||
                    !emergencycontact
                  ) {
                    alert("Please fill out all fields.");
                    return;
                  }
                  let data = {
                    name,
                    datebirth,
                    gender,
                    address,
                    phonenumber,
                    emergencycontact,
                  };
                  console.log(data);
                  await contract.addPersonalInfos(JSON.stringify(data));
                }}
                variant="outlined"
                style={{ height: "100%" }}
                fullWidth
              >
                Change Informations
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
