import React, { useState } from "react";
import { Box, Modal, TextField } from "@mui/material";

export default function ModalUse({onChange,id,open,onClosePop, style}) {
   const [popup,setPopup]= useState(true)
   const onClose = () => {
        setPopup(false)
        onClosePop(false)
    }
  return (
    <Modal keepMounted open={open} onClose={onClose}>
      <Box sx={style}>
        <TextField
          sx={{ width: "95%" }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          placeholder={`${id}`}
          name="name"
          onChange={onChange}
        />
        <TextField
          sx={{ width: "95%" }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          placeholder="Email"
          name="email"
          onChange={onChange}
        />
        <TextField
          sx={{ width: "95%" }}
          id="outlined-basic"
          label="role"
          variant="outlined"
          placeholder="role"
          name="role"
          onChange={onChange}
        />
      </Box>
    </Modal>
  );
}
