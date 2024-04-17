import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { ABI, ContractAddress } from "../../constants/Constants";
import { ethers } from "ethers";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
const AccesDoctor = ({tt}) => {
  const [addresse, setAddresse] = React.useState("");

  const [Doctors, setDoctors] = React.useState([]);

  const [networkChanged, setNetworkChanged] = useState(false);
  const [accountChanged, setAccountChanged] = useState(false);

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


        console.log("tt : ",tt)
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, [networkChanged, accountChanged]);

  useEffect(() => {
    const display = async () => {
      if (contract) {
        setDoctors([]);
        const length = await contract.displayaccessDoctorLength();
        let doctorsData = []; // Array to collect all the data
        for (let i = 0; i < parseInt(length._hex, 16); i++) {
          let data = await contract.getAccesDoctorAtIndex(account, i);
          doctorsData.push(data); // Push data into the array
        }
        setDoctors((prevDoctors) => [...prevDoctors, ...doctorsData]);
        doctorsData = [];
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
        </Grid>
      </Grid>
    </>
  );
};

export default AccesDoctor;
