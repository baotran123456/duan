import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Button,
} from '@mui/material';

import axios from "axios";

export default function Add_product(props) {

  const ip = "http://localhost:8080"

  // const [,set] = useState("")
  const [idImg, setIdImg] = useState(0)
  const [NameSP, setNameSP] = useState("")
  const [GiaGocSP, setGiaGocSP] = useState(0)
  const [GiaBanSP, setGiaBanSP] = useState(0)
  const [SoLuongSP, setSoLuongSP] = useState(0)
  const [DateNhapSP, setDateNhapSP] = useState()
  const [SaleSP, setSaleSP] = useState(0)
  const [TrangThaiSP, setTrangThaiSP] = useState("Hoạt động")
  const [LoaiSP, setLoaiSP] = useState()
  const [ChiTietSP, setChiTietSP] = useState("")

  const [idImgCheck, setIdImgCheck] = useState(0);

  //  format ngay 
  const [tokenDay, setTokenDay] = useState("")
  const [tokenMonth, setTokenMonth] = useState("")

  //  format ngay 
  var formatStart = new Date(DateNhapSP);

  var dayStart = formatStart.getDate();
  var monthStart = formatStart.getMonth() + 1;
  var yearStart = formatStart.getFullYear();

  // om Blur
  var dateStart = yearStart + `${tokenMonth}` + monthStart + `${tokenDay}` + dayStart;

  // ngay
  const [colorDate, setColorDate] = useState("#d8dde1");
  const [dateCheck, setDateCheck] = useState(true);
  const [errorDate, setErrorDate] = useState("");
  const [chxBtnDate, setChxBtnDate] = useState();
  const validateDate = (sp) => {
    if (sp != null) {
      setDateCheck(true)
      setColorDate("#d8dde1")
      setErrorDate("")
      setChxBtnDate(true)
    }
    if (sp == null || DateNhapSP == null) {
      setDateCheck(false)
      setColorDate("red")
      setErrorDate("Chưa nhập ngày")
      setChxBtnDate(false)
    }

  }
  function ErrorDateNhapSP(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorDateNhapSP}
      </div>
    )
  }

  // id sp
  const [colorIdsp, setColorIdsp] = useState("#d8dde1");
  const [idspCheck, setIdspCheck] = useState(true);
  const [errorIdsp, setErrorIdsp] = useState("");

  const validateIdSp = (sp) => {
    if (sp != null) {
      setIdspCheck(true);
      setColorIdsp("#d8dde1");
      setErrorIdsp("");
    }
    if (sp == 0) {
      setIdspCheck(false);
      setColorIdsp("red");
      setErrorIdsp("Id không để trống");
    }
  }
  function ErrorIdsp(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorIdsp}
      </div>
    )
  }
  // ten sp
  const [colorNamesp, setColorNamesp] = useState("#d8dde1");
  const [namespCheck, setNamespCheck] = useState(true);
  const [errorNamesp, setErrorNamesp] = useState("");
  const [chxBtnNamesp, setChxBtnNamesp] = useState();
  const validateNameSp = (sp) => {
    if (sp != null) {
      setNamespCheck(true);
      setColorNamesp("#d8dde1");
      setErrorNamesp("");
      setChxBtnNamesp(true)
    }
    if (sp == null) {
      setNamespCheck(false);
      setColorNamesp("red");
      setErrorNamesp("Tên sản phẩm không được để trống");
      setChxBtnNamesp(false)
    }
    if (sp.length == 0) {
      setNamespCheck(false);
      setColorNamesp("red");
      setErrorNamesp("Tên sản phẩm không được để trống");
      setChxBtnNamesp(false)
    }
  }
  function ErrorNamesp(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorNamesp}
      </div>
    )
  }

  //  giá gốc
  const [colorGiagocsp, setColorGiagocsp] = useState("#d8dde1");
  const [giagocspCheck, setGiagocspCheck] = useState(true);
  const [errorGiagoc, setErrorGiagocsp] = useState("");
  const [chxBtnGiagocsp, setChxBtnGiagocsp] = useState();
  const validateGiagocSp = (sp) => {
    if (sp != null) {
      setGiagocspCheck(true);
      setColorGiagocsp("#d8dde1");
      setErrorGiagocsp("");
      setChxBtnGiagocsp(true)
    }
    if (sp == null) {
      setGiagocspCheck(false);
      setColorGiagocsp("red");
      setChxBtnGiagocsp(false)
      setErrorGiagocsp("Giá gốc không được để trống");
    }
    if (sp == 0) {
      setGiagocspCheck(false);
      setColorGiagocsp("red");
      setChxBtnGiagocsp(false)
      setErrorGiagocsp("Giá gốc không được để trống");
    }
    if (sp.length == 0) {
      setGiagocspCheck(false);
      setColorGiagocsp("red");
      setChxBtnGiagocsp(false)
      setErrorGiagocsp("Giá gốc không được để trống");
    }
  }
  function ErrorGiagocSp(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorGiagocSp}
      </div>
    )
  }

  //  giá bán
  const [colorGiabansp, setColorGiabansp] = useState("#d8dde1");
  const [giabanspCheck, setGiabanspCheck] = useState(true);
  const [errorGiabansp, setErrorGiabansp] = useState("");
  const [chxBtnGiabansp, setChxBtnGiabansp] = useState();
  const validateGiabanSp = (sp) => {
    if (sp != null) {
      setGiabanspCheck(true);
      setColorGiabansp("#d8dde1");
      setErrorGiabansp("");
      setChxBtnGiabansp(true)
    }
    if (sp == null) {
      setGiabanspCheck(false);
      setColorGiabansp("red");
      setChxBtnGiabansp(false)
      setErrorGiabansp("Giá bán không được để trống");
    }
    if (sp == 0) {
      setGiabanspCheck(false);
      setColorGiabansp("red");
      setChxBtnGiabansp(false)
      setErrorGiabansp("Giá bán không được để trống");
    }
    if (sp.length == 0) {
      setGiabanspCheck(false);
      setColorGiabansp("red");
      setChxBtnGiabansp(false)
      setErrorGiabansp("Giá bán không được để trống");
    }
  }
  function ErrorGiabanSp(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorGiabanSp}
      </div>
    )
  }

  //  so luong
  const [colorSoluongsp, setColorSoluongsp] = useState("#d8dde1");
  const [soluongspCheck, setSoluongspCheck] = useState(true);
  const [errorSoluongsp, setErrorSoluongsp] = useState("");
  const [chxBtnSoluongsp, setChxBtnSoluongsp] = useState();
  const validateSoluongSp = (sp) => {
    if (sp != null) {
      setSoluongspCheck(true);
      setColorSoluongsp("#d8dde1");
      setErrorSoluongsp("");
      setChxBtnSoluongsp(true)
    }
    if (sp == null) {
      setSoluongspCheck(false);
      setColorSoluongsp("red");
      setChxBtnSoluongsp(false)
      setErrorSoluongsp("Số lượng không được để trống");
    }
    if (sp == 0) {
      setSoluongspCheck(false);
      setColorSoluongsp("red");
      setChxBtnSoluongsp(false)
      setErrorSoluongsp("Số lượng không được để trống");
    }
    if (sp.length == 0) {
      setSoluongspCheck(false);
      setColorSoluongsp("red");
      setChxBtnSoluongsp(false)
      setErrorSoluongsp("Số lượng không được để trống");
    }
  }
  function ErrorSoluongSp(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorSoluongSp}
      </div>
    )
  }

  // mô tả
  const [colorMotasp, setColorMotasp] = useState("#d8dde1");
  const [motaspCheck, setMotaspCheck] = useState(true);
  const [errorMotasp, setErrorMotasp] = useState("");
  const [chxBtnMotasp, setChxBtnMotasp] = useState();
  const validateMotaSp = (sp) => {
    if (sp != null) {
      setMotaspCheck(true);
      setColorMotasp("#d8dde1");
      setErrorMotasp("");
      setChxBtnMotasp(true)
    }
    if (sp == null) {
      setMotaspCheck(false);
      setColorMotasp("red");
      setErrorMotasp("Mô tả không để trống");
      setChxBtnMotasp(false)
    }
    if (sp.length == 0) {
      setMotaspCheck(false);
      setColorMotasp("red");
      setErrorMotasp("Mô tả không để trống");
      setChxBtnMotasp(false)
    }
  }
  function ErrorMotasp(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorMotasp}
      </div>
    )
  }


  // ---------------------------------------upload img--------------------------------

  const [multipleFiles, setMultipleFiles] = useState('');

  // img sp
  const [colorImagesp, setColorImagesp] = useState("#d8dde1");
  const [imagespCheck, setImagespCheck] = useState(true);
  const [errorImagesp, setErrorImagesp] = useState("");
  const [chxBtnImagesp, setChxBtnImagesp] = useState();

  const validateImagesp = (sp) => {
    if (sp != null) {
      setImagespCheck(true);
      setColorImagesp("#d8dde1");
      setErrorImagesp("");
      setChxBtnImagesp(true)
    }
    if (sp == null) {
      setImagespCheck(false);
      setColorImagesp("red");
      setErrorImagesp("Ảnh trống");
      setChxBtnImagesp(false)
    }
    if (sp.length == 0) {
      setImagespCheck(false);
      setColorImagesp("red");
      setErrorImagesp("Ảnh trống");
      setChxBtnImagesp(false)
    }
  }

  function ErrorImagesp(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorImagesp}
      </div>
    )
  }



  const multipleFilesUpload = async (data) => {
    try {
      await axios.post(ip + '/multipleFiles', data);
    } catch (error) {
      throw error;
    }
  }
  //chọn nhiều hình ảnh giai đoạn chọn hình ảnh
  const MultipleFileChange = (e) => {
    // set dữ liệu nhiều hình ảnh lên setMultipleFiles
    setMultipleFiles(e.target.files);
  }


  // upload dữ liệu nhiều hình ảnh lên API
  const UploadMultipleFiles = () => {
    // check validate trùng id

    validateImagesp(multipleFiles);
    validateIdSp(idImg);
    validateNameSp(NameSP);
    validateGiagocSp(GiaGocSP);
    validateGiabanSp(GiaBanSP);
    validateSoluongSp(SoLuongSP);
    validateDate(DateNhapSP)
    validateMotaSp(ChiTietSP)
    if (idImg == idImgCheck) {

    } else if (idImg != idImgCheck) {
      const formData = new FormData();
      formData.append('idImg', idImg);
      for (let i = 0; i < multipleFiles.length; i++) {
        formData.append('files', multipleFiles[i]);
      }

      // console.log(chxBtnImagesp, chxBtnDate, chxBtnNamesp, idspCheck, chxBtnGiagocsp, chxBtnGiabansp, chxBtnSoluongsp, chxBtnMotasp,);
      if (chxBtnDate == true && chxBtnNamesp == true && idspCheck == true && chxBtnGiagocsp == true
        && chxBtnGiabansp == true && chxBtnSoluongsp == true && chxBtnMotasp == true) {
        if (multipleFiles == "") {
          // console.log("error");
        } else if (multipleFiles != "") {
          axios.post(ip + "/add_Product", {
            idImg: idImg,
            NameSP: NameSP,
            GiaGocSP: GiaGocSP,
            GiaBanSP: GiaBanSP,
            SoLuongSP: SoLuongSP,
            DateNhapSP: DateNhapSP,
            SaleSP: SaleSP,
            TrangThaiSP: TrangThaiSP,
            LoaiSP: LoaiSP,
            ChiTietSP: ChiTietSP,
          })
          multipleFilesUpload(formData);
          handleClose();
        }
      } else {
        validateImagesp(multipleFiles);
        validateIdSp(idImg);
        validateNameSp(NameSP);
        validateGiagocSp(GiaGocSP);
        validateGiabanSp(GiaBanSP);
        validateSoluongSp(SoLuongSP);
        validateDate(DateNhapSP)
        validateMotaSp(ChiTietSP)
      }
    }
  }

  const handleClose = () => {
    props.setOpen(false);
    props.setShowBtn("add")
  };
  const handleCloseHuy = () => {
    props.setOpen(false);
  };
  useEffect(() => {
    props.danhsachSP.map((vl) => {
      setIdImgCheck(vl.idImg)
    })
  }, [])

  useEffect(() => {
    if (props.open == false) {
      //  giá trị về mặc định
      setMultipleFiles('')
      setIdImg(0)
      setNameSP("")
      setGiaGocSP(0)
      setGiaBanSP(0)
      setSoLuongSP(0)
      setDateNhapSP()
      setChiTietSP("")
      setTrangThaiSP("Hoạt động")
      // check validate về ẩn
      setImagespCheck(true)
      setIdspCheck(true)
      setNamespCheck(true)
      setGiagocspCheck(true)
      setGiabanspCheck(true)
      setSoluongspCheck(true)
      setDateCheck(true)
      setMotaspCheck(true)
      // setColor về mặc định
      setColorImagesp("#d8dde1")
      setColorIdsp("#d8dde1")
      setColorNamesp("#d8dde1")
      setColorGiagocsp("#d8dde1")
      setColorGiabansp("#d8dde1")
      setColorSoluongsp("#d8dde1")
      setColorDate("#d8dde1")
      setColorMotasp("#d8dde1")
      // setButton add ve rong
      setChxBtnNamesp()
      setChxBtnGiagocsp()
      setChxBtnGiabansp()
      setChxBtnSoluongsp()
      setChxBtnDate()
      setChxBtnMotasp()
    }
  })

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogContent>
        <div className="container-up" >
          <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Thêm thông tin sản phẩm</h2>
          <div className="frames_add_product">
            <div className="form_AddSP_Left">
              <div className="form_addsp_left_top">
                <div className="form_addsp_left_top_img">
                  <div className="form_img_product">
                    <div className="sale_left_top">
                      <input type="file" onChange={(e) => MultipleFileChange(e)}
                        className="custom-file-input-sp" multiple
                        style={{ borderColor: colorImagesp }}
                        onBlur={(e) => validateImagesp(e.target.value)}
                        required
                      />
                      <ErrorImagesp
                        isHidden={imagespCheck}
                        ErrorImagesp={errorImagesp} />
                    </div>
                  </div>
                </div>
                <div className="form_addsp_left_top_date">
                  <div className="form_dateGG">
                    <input type="date" className="form__input" placeholder=" "
                      onChange={(e) => setDateNhapSP(e.target.value)}
                      style={{ borderColor: colorDate }}
                      onBlur={() => validateDate(dateStart)}
                    />
                    <label className="form__label">Ngày Nhập</label>
                  </div>
                  <ErrorDateNhapSP
                    isHidden={dateCheck}
                    ErrorDateNhapSP={errorDate} />
                </div>
              </div>
              <div className="form_addsp_left_bottom">
                <div className="form_right_top">
                  <div className="form">
                    <input type="text" className="form__input" placeholder=" "
                      onChange={(e) => setGiaGocSP(e.target.value)}
                      style={{ borderColor: colorGiagocsp }}
                      onBlur={(e) => validateGiagocSp(e.target.value)}
                      required
                    />
                    <label className="form__label">Giá gốc</label>
                  </div>
                  <ErrorGiagocSp
                    isHidden={giagocspCheck}
                    ErrorGiagocSp={errorGiagoc} />
                </div>
                <div className="form_right_top">
                  <div className="form">
                    <input type="text" className="form__input" placeholder=" "
                      onChange={(e) => setGiaBanSP(e.target.value)}
                      style={{ borderColor: colorGiabansp }}
                      onBlur={(e) => validateGiabanSp(e.target.value)}
                      required
                    />
                    <label className="form__label">Giá bán</label>
                  </div>
                  <ErrorGiabanSp
                    isHidden={giabanspCheck}
                    ErrorGiabanSp={errorGiabansp} />
                </div>
                <div className="form_right_top">
                  <div className="form">
                    <input type="text" className="form__input" placeholder=" "
                      onChange={(e) => setSoLuongSP(e.target.value)}
                      style={{ borderColor: colorSoluongsp }}
                      onBlur={(e) => validateSoluongSp(e.target.value)}
                      required
                    />
                    <label className="form__label">Số lượng</label>
                  </div>
                  <ErrorSoluongSp
                    isHidden={soluongspCheck}
                    ErrorSoluongSp={errorSoluongsp} />
                </div>
              </div>
            </div>
            <div className="form_AddSP_Right">
              <div className="form_addsp_left_top">
                <div className="form_addsp_left_top_id">
                  <div className="form">
                    <input type="text" className="form__input" placeholder=" "
                      onChange={(e) => setIdImg(e.target.value)}
                      style={{ borderColor: colorIdsp }}
                      onBlur={(e) => validateIdSp(e.target.value)}
                      required
                    />
                    <label className="form__label">Id image:</label>
                  </div>
                  <ErrorIdsp
                    isHidden={idspCheck}
                    ErrorIdsp={errorIdsp} />
                </div>
                <div className="form_addsp_left_top_name">
                  <div className="form">
                    <input type="text" className="form__input" placeholder=" "
                      onChange={(e) => setNameSP(e.target.value)}
                      style={{ borderColor: colorNamesp }}
                      onBlur={(e) => validateNameSp(e.target.value)}
                      required
                    />
                    <label className="form__label">Tên Sản phẩm</label>
                  </div>
                  <ErrorNamesp
                    isHidden={namespCheck}
                    ErrorNamesp={errorNamesp} />
                </div>
              </div>
              <div className="form_addsp_right_bottom">
                <div className="form_addsp_right_bottom1">
                  <div className="form_right_top">
                    <div className="form_trangthai_product">
                      <select defaultValue={SaleSP} onChange={(e) => setSaleSP(e.target.value)}>
                        <option value='0'> Không giảm giá </option>
                        {props.dsSaleSP.map((vl, index) => {
                          if (vl.TrangThaiSale == "Hoạt động") {
                            return (
                              <option key={vl._id} value={vl.PhanTramGiamGia}> {vl.NameSaleSP} giảm {vl.PhanTramGiamGia}%</option>
                            )
                          } else if (vl.TrangThaiSale == "Không hoạt động") {
                          }
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="form_right_top">
                    <div className="form_trangthai_product">
                      <select defaultValue={TrangThaiSP} onChange={(e) => setTrangThaiSP(e.target.value)}>
                        <option value="Hoạt động">Hoạt động</option>
                        <option value="Không hoạt động">Không hoạt động </option>
                      </select>
                    </div>
                  </div>
                  <div className="form_right_top">
                    <div className="form_trangthai_product">
                      <select defaultValue={LoaiSP} onChange={(e) => setLoaiSP(e.target.value)}>
                        {props.dsLoaiSP.map((vl, index) => {
                          if (vl.TrangThaiLoaiSP == "Hoạt động") {
                            return (
                              <option key={vl._id} value={vl.NameLoaiSP}> {vl.NameLoaiSP}</option>
                            )
                          } else if (vl.TrangThaiLoaiSP == "Không hoạt động") {
                          }
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form_addsp_right_bottom2">
                  <div className="form_mota_Product">
                    <textarea onChange={(e) => setChiTietSP(e.target.value)} title=""
                      placeholder="Mô tả" className="form_mota_Product" rows="13"
                      style={{ borderColor: colorMotasp }}
                      onBlur={(e) => validateMotaSp(e.target.value)}
                      required
                    />
                    <ErrorMotasp
                      isHidden={motaspCheck}
                      ErrorMotasp={errorMotasp} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="btn-dialog">
        <Button variant="outlined" className="btn_add_cancel" onClick={handleCloseHuy}>Hủy</Button>
        <Button variant="outlined" className="btn_add_cancel" color="primary" onClick={UploadMultipleFiles}>Thêm</Button>
      </DialogActions>
    </Dialog>
  )
}