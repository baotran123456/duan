import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
    Button, DialogTitle,

} from '@mui/material';
import axios from "axios";
// gọi trang
import ItemDHChiTiet from "../Item/ItemDHChiTiet";
// css
import "../css/dialog.css"


export default function ChiTietDonHang(props) {

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
            maxWidth="md"
        >
            <DialogTitle>
                <div>
                    <h2 style={{ textAlign: 'center', padding: '1%  0 2% 0', color: '#2065d1' }}>Chi tiết trạng thái đơn hàng</h2>
                    <div className="frames_ChiTiet_DH_excel" style={{ display: "flex" }}>
                        <div className="img_ChiTiet_DH_excel">

                        </div>
                        <div className="name_ChiTiet_DH_excel">
                            Tên đơn hàng
                        </div>
                        <div className="sdt_ChiTiet_DH_excel">
                            Giá
                        </div>
                        <div className="soluong_ChiTiet_DH_excel">
                            Số Lượng
                        </div>
                        <div className="tongTien_ChiTiet_DH_excel">
                            Tổng tiền
                        </div>
                    </div>
                </div>

            </DialogTitle>
            <DialogContent style={{ padding: '2%' }} >


                {props.DsSP.map((vl, index) => {
                    return (
                        <ItemDHChiTiet
                            key={vl._id}
                            _id={vl._id}
                            Image={vl.Image}
                            NameSP={vl.NameSP}
                            GiaCX={vl.GiaCX}
                            SoLuongSP={vl.SoLuongSP}
                        />
                    )
                })}
            </DialogContent>
            <DialogActions className="btn_xemThem_DH">
                <Button variant="outlined" className="btn_add_cancel_DH" onClick={handleClose}>Hủy</Button>
            </DialogActions>
        </Dialog>
    )
}