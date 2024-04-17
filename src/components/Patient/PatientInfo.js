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

export const PatientInfo = () => {
  const [name, setName] = React.useState("");
  const [datebirth, setDatebirth] = React.useState("2024-04-09");
  const [gender, setGender] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phonenumber, setPhonenumber] = React.useState("");
  const [emergencycontact, setEmergencycontact] = React.useState("");

  //
  const [networkChanged, setNetworkChanged] = useState(false);
  const [accountChanged, setAccountChanged] = useState(false);

  const [infosPersonal, setInfosPersonal] = useState({});
  

  useEffect(() => {
    if (networkChanged) {
      setNetworkChanged(false);
    } else if (accountChanged) {
      setAccountChanged(false);
    }
  }, [networkChanged, accountChanged]);

  //0x5DC29e716f61982B9D86A309E05b6BF0B2fB0Eb2
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //connect to our metamask

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          setNetworkChanged(true);
        });
        window.ethereum.on("accountsChanged", () => {
          setAccountChanged(true);
        });

        await provider.send("eth_requestAccounts", []); //open your metamask
        const signer = provider.getSigner(); //signer is for change in smart contract
        const address = await signer.getAddress();
        //console.log(address)
        setAccount(address);
        let contractAddress = ContractAddress;
        let contractAbi = ABI;

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        ); //create instance of our smart contract
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, [networkChanged, accountChanged]);


  useEffect(() => {
    const loadContract = async () => {
      if (contract) {
        let data = await contract.displayPersonalInfos();
        let ddt = await JSON.parse(data);
        setInfosPersonal(ddt);
      }
    };
  
    loadContract();
  }, [contract]);
  
  
  return (
    <>
      <h1>Infos</h1>
      <Grid container spacing={2}>
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
      </Grid>
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
        <Grid item xs={12} md={6} mt={3}>
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
            Add Informations
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
