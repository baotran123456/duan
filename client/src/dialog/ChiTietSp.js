import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Button } from "@mui/material";
import axios from "axios";

// css
import "../css/dialog.css";
import Itemhinh from "../Item/Itemhinh";

export default function ChiTietSp(props) {
  //  format ngay tao
  var formatTao = new Date(props.DateNhapSP);
  var dayTao = formatTao.getDate();
  var monthTao = formatTao.getMonth() + 1;
  var yearTao = formatTao.getFullYear();
  var dateTao = dayTao + "/" + monthTao + "/" + yearTao;
  const ip = "http://localhost:8080";

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
      <DialogContent style={{ height: '700px' }}>
        <div className="container-up">
          <h2
            style={{
              textAlign: "center",
              paddingBottom: "10px",
              color: "#2065d1",
            }}
          >
            Xem thêm thông tin sản phẩm
          </h2>
          <div className="frames_chitiet">
            <div className="dialog_xemthem_left">
              <div className="dialog_xemthem_left_top">
                {props.multipleFiles.map((item, index) => (
                  <Itemhinh key={index} item={item.files} />
                ))}
              </div>
            </div>
            <div className="dialog_xemthem_right">
              <div className="dl_ten">{props.NameSP}</div>
              <div className="dl_soLuong">Số lượng: {props.SoLuongSP}</div>
              <div className="dl_soLuong">Ngày nhập: {dateTao}</div>
              <div className="dl_gia">Giá gốc: {props.GiaGocSP}VND</div>
              <div className="dl_gia">Giá bán: {props.GiaBanSP}VND</div>
              <div className="dl_loaiSP">Giảm giá: {props.SaleSP}%</div>
              <div className="dl_loaiSP">Loại sản phẩm: {props.LoaiSP}</div>
              <div className="dl_trangthai">
                Trạng thái: {props.TrangThaiSP}
              </div>
              <div className="dialog_xemthem_left_bottom">
                <p className="mota_title">Mô tả sản phẩm:</p>
                <p className="mota_content">{props.ChiTietSP}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="btn-dialog">
        <Button
          variant="outlined"
          className="btn_add_cancel_ChiTietSP"
          onClick={handleClose}
        >
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}
