import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import BusinessIcon from "@mui/icons-material/Business";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

import HomeIcon from "@mui/icons-material/Home";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderIcon from "@mui/icons-material/Folder";
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../AppContext";

export default function TemporaryDrawer({ status, setStatus }) {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const [isDoctor, setIsDoctor] = React.useState(false);
  const [isHospital, seIsHospital] = React.useState(false);
  const [isAdmin, seIsAdmin] = React.useState(false);

  const { account, contract, provider } = useAppContext();

  useEffect(() => {
    setOpen(status);

    if (contract) {
    let load = async () => {
      let IsDoctor = await contract.isDoctor();
      setIsDoctor(IsDoctor);
      let IsHospital = await contract.isHospital();
      seIsHospital(IsHospital);
      let isAdmin = await contract.isAdmin();
      seIsAdmin(isAdmin);
    };
    load();
  }
  }, [status]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    setStatus(newOpen);
  };

  const getIconComponent = (index) => {
    switch (index) {
      case 0:
        return <HomeIcon />;
      case 1:
        return <CreateNewFolderIcon />;
      case 2:
        return <FolderIcon />;
      case 3:
        return <DriveFolderUploadRoundedIcon />;

      default:
        return null;
    }
  };
  const getIconComponent2 = (index) => {
    switch (index) {
      case 0:
        return <ContactEmergencyIcon />;
      case 1:
        return <SupervisedUserCircleIcon />;
      case 2:
        return <BusinessIcon />;
      case 3:
        return <BusinessIcon />;

      default:
        return null;
    }
  };

  const getIconComponent3 = (index) => {
    switch (index) {
      case 0:
        return <SupervisedUserCircleIcon />;
      case 1:
        return <BusinessIcon />;

      default:
        return null;
    }
  };

  const clickComponent = (index) => {
    switch (index) {
      case 0:
        navigate("");
        break;
      case 1:
        navigate("CreateEhr");
        break;
      case 2:
        navigate("AccessEhr");
        break;
      case 3:
        navigate("categories");
        break;
      default:
        navigate("/");
        break;
    }
  };
  const clickComponent2 = (index) => {
    switch (index) {
      case 0:
        navigate("patientInfo");
        break;
      case 1:
        navigate("DoctorAccess");
        break;
      case 2:
        navigate("HospitalAccess");
        break;
      case 3:
        navigate("UploadEHR");
        break;
      default:
        navigate("HospitalAccess");
        break;
    }
  };

  const clickComponent3 = (index) => {
    switch (index) {
      case 0:
        navigate("AddDoctor");
        break;
      case 1:
        navigate("AddHospital");
        break;
      default:
        navigate("HospitalAccess");
        break;
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      {(isDoctor || isHospital) && (
        <>
          <List>
            {["Home", "Create EHR", "Access EHR"].map((text, index) => (
              <ListItem
                key={text}
                onClick={() => clickComponent(index)}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>{getIconComponent(index)}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}

      {(!isDoctor || !isHospital) && (
        <>
          <List>
            {["Home"].map((text, index) => (
              <ListItem
                key={text}
                onClick={() => clickComponent(index)}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>{getIconComponent(index)}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}

      <Divider />
      {isAdmin && (
        <>
          <List>
            {["Add Doctors", "Add Hospitals"].map((text, index) => (
              <ListItem
                key={text}
                onClick={() => clickComponent3(index)}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>{getIconComponent3(index)}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </>
      )}

      <List>
        {[
          "Personel Informations",
          "Doctors Access",
          "Hospitals Access",
          "Upload EHR",
        ].map((text, index) => (
          <ListItem
            key={text}
            onClick={() => clickComponent2(index)}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>{getIconComponent2(index)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
