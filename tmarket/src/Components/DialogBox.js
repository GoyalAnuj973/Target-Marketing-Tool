import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DialogBox(props) {

  const handleClose = () => {
    console.log(props);
    props.func(false);
  };

  return (
    <div>
      <Dialog
        open={props?.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {Object.entries(props?.response).map(([key, value]) => {
                if( key !== "customer" && key !== "segment")
                    return <p>{key} :{value}</p>
                else if (key == "segment")
                    return <p>Please select a valid segment</p>
                else
                    return <p>{"No customer available for such segment"}</p>
            })}     
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
