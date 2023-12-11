import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
    Button,

} from '@mui/material';
import axios from "axios";

import ExportCSV from "../components/ExportCSV.js"

// css
import "../css/dialog.css"


export default function DemoExcel(props) {

    const ip = "http://localhost:8080"

    const handleClose = () => {
        props.setOpen(false);
    };
    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="lg"
        >
            <DialogContent  >
                <ExportCSV
                    danhsachSP={props.danhsachSP}
                />
            </DialogContent>
            <DialogActions className="btn-dialog">
                <Button variant="outlined" className="btn_add_cancel" onClick={handleClose}>Hủy</Button>
            </DialogActions>
        </Dialog>
    )
}