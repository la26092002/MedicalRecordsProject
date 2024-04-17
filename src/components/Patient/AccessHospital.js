import React from 'react'
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
const AccessHospital = () => {
    const [addresse, setAddresse] = React.useState("");
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
            onClick={() => {
              let data = {
                addresse,
              };
              console.log(data);
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
  )
}

export default AccessHospital