import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useAppContext } from "../../AppContext";

const UploadEHR = () => {
    const [isData, setIsData] = useState(false);
    const [EHR, setEHR] = useState([]);
  
    const { account, contract, provider } = useAppContext();
    useEffect(() => {
      const loadContract = async () => {
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
            console.log(record)
            // record = record.slice(0, -1); // Remove last character
            //records.push(JSON.parse(record)); // Assuming record is already JSON
          }
  
          setEHR(records);
        }
      };
  
      loadContract();
    }, [contract]);
  
   
  
    return <div>UploadEHR</div>;
  };
  
  export default UploadEHR;
  