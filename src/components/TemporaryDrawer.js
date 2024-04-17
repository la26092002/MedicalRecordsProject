import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CategoryIcon from "@mui/icons-material/Category";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import StoreIcon from '@mui/icons-material/Store';

import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import BusinessIcon from '@mui/icons-material/Business';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import HomeIcon from '@mui/icons-material/Home';

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function TemporaryDrawer({ status, setStatus }) {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(status);
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
        return <CategoryIcon />;

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

      default:
        return null;
    }
  };
  


  const clickComponent = (index) => {
    switch (index) {
      case 0:
        navigate("product");
        break;
      case 1:
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
      default:
        navigate("HospitalAccess");
        break;
    }
  };
  

  

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Home", "Add Category", "Send email", "Drafts"].map(
          (text, index) => (
            <ListItem key={text} onClick={() => clickComponent(index)} disablePadding>
              <ListItemButton >
                <ListItemIcon>{getIconComponent(index)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        {["Personel Informations", "Doctors Access", "Hospitals Access"].map((text, index) => (
          <ListItem key={text} onClick={() => clickComponent2(index)} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              {getIconComponent2(index)}
              </ListItemIcon>
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
