import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Button,
} from '@mui/material';


import axios from "axios";

export default function Add_LoaiSP(props) {

  const ip = "http://localhost:8080"

  // const [,set] = useState("")
  const [NameLoaiSP, setNameLoaiSP] = useState("")
  const [MotaLoaiSP, setMotaLoaiSP] = useState("")
  const [TrangThaiLoaiSP, setTrangThaiLoaiSP] = useState("Hoạt động")

  // ten loai san pham
  const [colorNamelsp, setColorNamelsp] = useState("#d8dde1");
  const [namelspCheck, setNamelspCheck] = useState(true);
  const [errorNamelsp, setErrorNamelsp] = useState("");
  const [chxBtnNamelsp, setChxBtnNamelsp] = useState();
  const validateNameLsp = (sa) => {
    if (sa != null) {
      setNamelspCheck(true);
      setColorNamelsp("#d8dde1");
      setErrorNamelsp("");
      setChxBtnNamelsp(true)
    }
    if (sa == null) {
      setNamelspCheck(false);
      setColorNamelsp("red");
      setErrorNamelsp("Tên loại sản phẩm không được để trống");
      setChxBtnNamelsp(false)
    }
    if (sa.length == 0) {
      setNamelspCheck(false);
      setColorNamelsp("red");
      setErrorNamelsp("Tên loại sản phẩm không được để trống");
      setChxBtnNamelsp(false)
    }
  }
  function ErrorNameloaisp(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorNameloaisp}
      </div>
    )
  }

  // mo ta
  const [colorMota, setColorMota] = useState("#d8dde1");
  const [motaCheck, setMotaCheck] = useState(true);
  const [errorMota, setErrorMota] = useState("");
  const [chxBtnMotalsp, setChxBtnMoTalsp] = useState();
  const validateMotalsp = (sa) => {
    if (sa != null) {
      setColorMota("#d8dde1");
      setMotaCheck(true);
      setErrorMota("");
      setChxBtnMoTalsp(true)
    }
    if (sa == null) {
      setColorMota("red");
      setMotaCheck(false);
      setErrorMota("Mô tả không được để trống");
      setChxBtnMoTalsp(false)
    }
    if (sa.length == 0) {
      setColorMota("red");
      setMotaCheck(false);
      setErrorMota("Mô tả không được để trống");
      setChxBtnMoTalsp(false)
    }
  }
  function ErrorMota(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorMota}
      </div>
    )
  }

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });
  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    })
    const data = new FormData();
    data.append('file', event.target.files[0]);
    // console.log(data);

    axios.post(ip + "/uploadFileAPI", data)
      .then(res => { // then print response status
        // console.log(res.data);
      });
  }

  const btnAdd_LoaiSP = () => {
    if (chxBtnNamelsp == true && chxBtnMotalsp == true) {
      axios.post(ip + "/add_LoaiSP", {
        NameLoaiSP: NameLoaiSP,
        MotaLoaiSP: MotaLoaiSP,
        TrangThaiLoaiSP: TrangThaiLoaiSP,
      })
      handleClose();
    } else {
      validateNameLsp(NameLoaiSP);
      validateMotalsp(MotaLoaiSP);
    }
  }

  useEffect(() => {
    if (props.open == false) {
      //  giá trị về mặc định
      setNameLoaiSP("")
      setMotaLoaiSP("")
      setTrangThaiLoaiSP("Hoạt động")
      // check validate về ẩn
      setNamelspCheck(true)
      setMotaCheck(true)

      // setColor về mặc định
      setColorNamelsp("#d8dde1")
      setColorMota("#d8dde1")
      // setButton add ve rong
      setChxBtnNamelsp()
      setChxBtnMoTalsp()
    }
  })
  const handleClose = () => {
    props.setOpen(false);
    props.setShowBtn("add")
    setuserInfo({
      ...userInfo,
      file: [],
      filepreview: null,
    })
  };

  const handleCloseHuy = () => {
    props.setOpen(false);
    setuserInfo({
      ...userInfo,
      file: [],
      filepreview: null,
    })
  };
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogContent >
        <div className="container-up" >
          <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Thêm thông tin loại sản phẩm</h2>
          <div className="frames_loaiSp">
            <div className="frames_loaiSp_top">
              <div className="loaiSP_left">
                <div className="form_img_image">
                  {userInfo.filepreview !== null ?
                    <img style={{ borderRadius: '5px' }} width="100%" height="248" src={userInfo.filepreview} alt="UploadImage" />
                    : null}
                </div>
                <div className="form_img_clickFix_blog">
                  <input type="file" onChange={(e) => handleInputChange(e)} className="custom-file-input" multiple />

                </div>
              </div>
              <div className="loaiSP_right">
                <div className="form_right_top">
                  <div className="form">
                    <input type="text" className="form__input" placeholder=" " name="Tên áo"
                      onChange={(e) => setNameLoaiSP(e.target.value)}
                      style={{ borderColor: colorNamelsp }}
                      onBlur={(e) => validateNameLsp(e.target.value)}
                      required
                    />
                    <label className="form__label">Tên loại sản phẩm</label>
                  </div>
                  <ErrorNameloaisp
                    isHidden={namelspCheck}
                    ErrorNameloaisp={errorNamelsp} />
                </div>
                <div className="form_trangthai">
                  <select defaultValue={TrangThaiLoaiSP} onChange={(e) => setTrangThaiLoaiSP(e.target.value)}>
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Không hoạt động">Không hoạt động </option>
                  </select>
                </div>
                <div className="form_mota_LSP">
                  <textarea onChange={(e) => setMotaLoaiSP(e.target.value)} title=""
                    placeholder="Mô tả" name="thông tin" className="mota_txtArea" rows="6"
                    style={{ borderColor: colorMota, }}
                    onBlur={(e) => validateMotalsp(e.target.value)}
                    required
                  />
                  <ErrorMota
                    isHidden={motaCheck}
                    ErrorMota={errorMota} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="btn-dialog">
        <Button variant="outlined" className="btn_add_cancel" onClick={handleCloseHuy}>Hủy</Button>
        <Button variant="outlined" className="btn_add_cancel" color="primary" onClick={btnAdd_LoaiSP}>Thêm</Button>
      </DialogActions>
    </Dialog>
  )
}