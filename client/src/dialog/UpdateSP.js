import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Button,

} from '@mui/material';
import axios from "axios";

export default function UpdateSP(props) {

  const ip = "http://localhost:8080"

  const [NameSPFix, setNameSPFix] = useState(props.NameSP)
  const [GiaGocSPFix, setGiaGocSPFix] = useState(props.GiaGocSP)
  const [GiaBanSPFix, setGiaBanSPFix] = useState(props.GiaBanSP)
  const [SoLuongSPFix, setSoLuongSPFix] = useState(props.SoLuongSP)
  const [DateNhapSPFix, setDateNhapSPFix] = useState(props.DateNhapSP)
  const [SaleSPFix, setSaleSPFix] = useState(props.SaleSP)
  const [TrangThaiSPFix, setTrangThaiSPFix] = useState(props.TrangThaiSP)
  const [LoaiSPFix, setLoaiSPFix] = useState(props.LoaiSP)
  const [ChiTietSPFix, setChiTietSPFix] = useState(props.ChiTietSP)


  // ten sp
  const [colorNamespfix, setColorNamespfix] = useState("#d8dde1");
  const [namespCheckfix, setNamespCheckfix] = useState(true);
  const [errorNamespfix, setErrorNamespfix] = useState("");
  const [chxBtnNamespfix, setChxBtnNamespfix] = useState();
  const validateNameSpfix = (sp) => {
    if (sp != null) {
      setNamespCheckfix(true);
      setColorNamespfix("#d8dde1");
      setErrorNamespfix("");
      setChxBtnNamespfix(true)
    }
    if (sp == null) {
      setNamespCheckfix(false);
      setColorNamespfix("red");
      setErrorNamespfix("Tên sản phẩm không được để trống");
      setChxBtnNamespfix(false)
    }
    if (sp.length == 0) {
      setNamespCheckfix(false);
      setColorNamespfix("red");
      setErrorNamespfix("Tên sản phẩm không được để trống");
      setChxBtnNamespfix(false)
    }
  }
  function ErrorNamespfix(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorNamespfix}
      </div>
    )
  }

  //  giá gốc
  const [colorGiagocspfix, setColorGiagocspfix] = useState("#d8dde1");
  const [giagocspCheckfix, setGiagocspCheckfix] = useState(true);
  const [errorGiagocspfix, setErrorGiagocspfix] = useState("");
  const [chxBtnGiagocspfix, setChxBtnGiagocspfix] = useState();
  const validateGiagocSpfix = (sp) => {
    if (sp != null) {
      setGiagocspCheckfix(true);
      setColorGiagocspfix("#d8dde1");
      setErrorGiagocspfix("");
      setChxBtnGiagocspfix(true)
    }
    if (sp == null) {
      setGiagocspCheckfix(false);
      setColorGiagocspfix("red");
      setChxBtnGiagocspfix(false)
      setErrorGiagocspfix("Giá gốc không được để trống");
    }
    if (sp == 0) {
      setGiagocspCheckfix(false);
      setColorGiagocspfix("red");
      setChxBtnGiagocspfix(false)
      setErrorGiagocspfix("Giá gốc không được để trống");
    }
    if (sp.length == 0) {
      setGiagocspCheckfix(false);
      setColorGiagocspfix("red");
      setChxBtnGiagocspfix(false)
      setErrorGiagocspfix("Giá gốc không được để trống");
    }
  }
  function ErrorGiagocSpfix(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorGiagocSpfix}
      </div>
    )
  }

  //  giá bán
  const [colorGiabanspfix, setColorGiabanspfix] = useState("#d8dde1");
  const [giabanspCheckfix, setGiabanspCheckfix] = useState(true);
  const [errorGiabanspfix, setErrorGiabanspfix] = useState("");
  const [chxBtnGiabanspfix, setChxBtnGiabanspfix] = useState();
  const validateGiabanSpfix = (sp) => {
    if (sp != null) {
      setGiabanspCheckfix(true);
      setColorGiabanspfix("#d8dde1");
      setErrorGiabanspfix("");
      setChxBtnGiabanspfix(true)
    }
    if (sp == null) {
      setGiabanspCheckfix(false);
      setColorGiabanspfix("red");
      setChxBtnGiabanspfix(false)
      setErrorGiabanspfix("Giá bán không được để trống");
    }
    if (sp == 0) {
      setGiabanspCheckfix(false);
      setColorGiabanspfix("red");
      setChxBtnGiabanspfix(false)
      setErrorGiabanspfix("Giá bán không được để trống");
    }
    if (sp.length == 0) {
      setGiabanspCheckfix(false);
      setColorGiabanspfix("red");
      setChxBtnGiabanspfix(false)
      setErrorGiabanspfix("Giá bán không được để trống");
    }
  }
  function ErrorGiabanSpfix(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorGiabanSpfix}
      </div>
    )
  }

  //  so luong
  const [colorSoluongspfix, setColorSoluongspfix] = useState("#d8dde1");
  const [soluongspCheckfix, setSoluongspCheckfix] = useState(true);
  const [errorSoluongspfix, setErrorSoluongspfix] = useState("");
  const [chxBtnSoluongspfix, setChxBtnSoluongspfix] = useState();
  const validateSoluongSpfix = (sp) => {
    if (sp != null) {
      setSoluongspCheckfix(true);
      setColorSoluongspfix("#d8dde1");
      setErrorSoluongspfix("");
      setChxBtnSoluongspfix(true)
    }
    if (sp == null) {
      setSoluongspCheckfix(false);
      setColorSoluongspfix("red");
      setChxBtnSoluongspfix(false)
      setErrorSoluongspfix("Số lượng không được để trống");
    }
    if (sp == 0) {
      setSoluongspCheckfix(false);
      setColorSoluongspfix("red");
      setChxBtnSoluongspfix(false)
      setErrorSoluongspfix("Số lượng không được để trống");
    }
    if (sp.length == 0) {
      setSoluongspCheckfix(false);
      setColorSoluongspfix("red");
      setChxBtnSoluongspfix(false)
      setErrorSoluongspfix("Số lượng không được để trống");
    }
  }
  function ErrorSoluongSpfix(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorSoluongSpfix}
      </div>
    )
  }

  // mô tả
  const [colorMotaspfix, setColorMotaspfix] = useState("#d8dde1");
  const [motaspCheckfix, setMotaspCheckfix] = useState(true);
  const [errorMotaspfix, setErrorMotaspfix] = useState("");
  const [chxBtnMotaspfix, setChxBtnMotaspfix] = useState();
  const validateMotaSpfix = (sp) => {
    if (sp != null) {
      setMotaspCheckfix(true);
      setColorMotaspfix("#d8dde1");
      setErrorMotaspfix("");
      setChxBtnMotaspfix(true)
    }
    if (sp == null) {
      setMotaspCheckfix(false);
      setColorMotaspfix("red");
      setErrorMotaspfix("Mô tả không để trống");
      setChxBtnMotaspfix(false)
    }
    if (sp.length == 0) {
      setMotaspCheckfix(false);
      setColorMotaspfix("red");
      setErrorMotaspfix("Mô tả không để trống");
      setChxBtnMotaspfix(false)
    }
  }
  function ErrorMotaspfix(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorMotaspfix}
      </div>
    )
  }
  // ---------------------------------------upload img--------------------------------

  const [multipleFiles, setMultipleFiles] = useState();

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
  const UploadMultipleFiles = async () => {

    validateNameSpfix(NameSPFix);
    validateGiagocSpfix(GiaGocSPFix);
    validateGiabanSpfix(GiaBanSPFix);
    validateSoluongSpfix(SoLuongSPFix)
    validateMotaSpfix(ChiTietSPFix);
    // console.log(chxBtnNamespfix, chxBtnGiagocspfix, chxBtnGiabanspfix, chxBtnSoluongspfix, chxBtnMotaspfix);

    const formData = new FormData();
    formData.append('idImg', props.idImg);
    for (let i = 0; i < multipleFiles; i++) {
      formData.append('files', multipleFiles[i]);
    }
    if (chxBtnNamespfix == null && chxBtnGiagocspfix == null && chxBtnGiabanspfix == null
      && chxBtnSoluongspfix == null && chxBtnMotaspfix == null) {
      validateNameSpfix(NameSPFix);
      validateGiagocSpfix(GiaGocSPFix);
      validateGiabanSpfix(GiaBanSPFix);
      validateSoluongSpfix(SoLuongSPFix)
      validateMotaSpfix(ChiTietSPFix);
    } else if (chxBtnNamespfix == true && chxBtnGiagocspfix == true && chxBtnGiabanspfix == true
      && chxBtnSoluongspfix == true && chxBtnMotaspfix == true) {
      if (multipleFiles == null) {
        axios.put(ip + `/UpdateSP/${props._id}`, {
          NameSP: NameSPFix,
          GiaGocSP: GiaGocSPFix,
          GiaBanSP: GiaBanSPFix,
          SoLuongSP: SoLuongSPFix,
          DateNhapSP: DateNhapSPFix,
          SaleSP: SaleSPFix,
          TrangThaiSP: TrangThaiSPFix,
          LoaiSP: LoaiSPFix,
          ChiTietSP: ChiTietSPFix,
        })
        handleClose();
      } else if (multipleFiles != null) {

        axios.delete(ip + `/DeleteImg/${props.idImg}`).then((res) => {

          multipleFilesUpload(formData);

          axios.put(ip + `/UpdateSP/${props._id}`, {
            NameSP: NameSPFix,
            GiaGocSP: GiaGocSPFix,
            GiaBanSP: GiaBanSPFix,
            SoLuongSP: SoLuongSPFix,
            DateNhapSP: DateNhapSPFix,
            SaleSP: SaleSPFix,
            TrangThaiSP: TrangThaiSPFix,
            LoaiSP: LoaiSPFix,
            ChiTietSP: ChiTietSPFix,
          })
          handleClose();
        }
        )
      }
    }
  }

  //  format ngay fix
  const [tokenDayEnd, setTokenDayEnd] = useState("")
  const [tokenMonthEnd, setTokenMonthEnd] = useState("")
  var formatEndBF = new Date(DateNhapSPFix);

  var dayEndBF = formatEndBF.getDate();
  var monthEndBF = formatEndBF.getMonth() + 1;
  var yearEndBF = formatEndBF.getFullYear();
  var dateEndBF = yearEndBF + `${tokenMonthEnd}` + monthEndBF + `${tokenDayEnd}` + dayEndBF;

  useEffect(() => {
    // format ngay
    if (dayEndBF < 10) {
      setTokenDayEnd("-0")
    } else {
      setTokenDayEnd("-")
    }
    if (monthEndBF < 10) {
      setTokenMonthEnd("-0")
    } else {
      setTokenMonthEnd("-")
    }

    if (props.open == false) {

      // check validate về ẩn
      setNamespCheckfix(true)
      setGiagocspCheckfix(true)
      setGiabanspCheckfix(true)
      setSoluongspCheckfix(true)
      setMotaspCheckfix(true)

      // setColor về mặc định
      setColorNamespfix("#d8dde1")
      setColorGiagocspfix("#d8dde1")
      setColorGiabanspfix("#d8dde1")
      setColorSoluongspfix("#d8dde1")
      setColorMotaspfix("#d8dde1")

      // setButton add ve rong
      setChxBtnNamespfix()
      setChxBtnGiagocspfix()
      setChxBtnGiabanspfix()
      setChxBtnSoluongspfix()
      setChxBtnMotaspfix()
    }
    validateNameSpfix(NameSPFix);
    validateGiagocSpfix(GiaGocSPFix);
    validateGiabanSpfix(GiaBanSPFix);
    validateSoluongSpfix(SoLuongSPFix);
    validateMotaSpfix(ChiTietSPFix);
  })

  const handleClose = () => {
    props.setOpen(false);
    props.setShowBtn("update")
  };

  const handleCloseHuy = () => {
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
      <DialogContent style={{ height: '630px' }}>
        <div className="container-up" >
          <h2 style={{ textAlign: 'center', color: '#2065d1' }}>Sửa thông tin sản phẩm</h2>
          <div className="frames_product_fix">
            <div className="frames_pro_fix_top">
              <div className="form_UpDateSP_Left">
                <div className="form_img_cu">
                  {props.multipleFiles.map((element, index) =>
                    <div className="imgUpdateProduct" key={index}>
                      {element.files.map((file, index) => {
                        return (
                          <div className="format_img_sp" key={index}>
                            <img style={{ borderRadius: '8px' }} src={ip + `/${file.filePath}`} width="100" height="130" className="card-img-top img-responsive" alt="img" />
                          </div>
                        )
                      }
                      )}
                    </div>
                  )}
                </div>
                <div className="form_img_moi">
                  <div className="form_addsp_left_top_img">
                    <input type="file" onChange={(e) => MultipleFileChange(e)} className="custom-file-input-sp-fix" multiple />

                  </div>
                  <div className="form_addsp_left_top_date">
                    <div className="form_date_product">
                      <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                        onChange={(e) => setDateNhapSPFix(e.target.value)}
                        defaultValue={dateEndBF}

                      />
                      <label className="form__label">Ngày Nhập</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form_UpDateSP_Right">
                <div className="form_trangthai_product">
                  <select defaultValue={LoaiSPFix} onChange={(e) => setLoaiSPFix(e.target.value)}>
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
                <div className="form_trangthai_product">
                  <select defaultValue={SaleSPFix} onChange={(e) => setSaleSPFix(e.target.value)}>
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
                <div className="form_trangthai_product">
                  <select defaultValue={TrangThaiSPFix} onChange={(e) => setTrangThaiSPFix(e.target.value)}>
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Không hoạt động">Không hoạt động </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="frames_pro_fix_bottom">
              <div className="frames_pro_fix_bottom_left">
                <div className="ipt_validate_sp">
                  <div className="form_Product">
                    <input type="text" className="form__input" placeholder=" " name="Tên áo"
                      onChange={(e) => setNameSPFix(e.target.value)}
                      defaultValue={props.NameSP}
                      style={{ borderColor: colorNamespfix }}
                      onBlur={() => validateNameSpfix(NameSPFix)}
                      required
                    />
                    <label className="form__label">Tên SP</label>
                  </div>
                  <ErrorNamespfix
                    isHidden={namespCheckfix}
                    ErrorNamespfix={errorNamespfix} />
                </div>
                <div className="ipt_validate_sp">
                  <div className="form_Product">
                    <input type="text" className="form__input" placeholder=" " name="Giá gốc"
                      onChange={(e) => setGiaGocSPFix(e.target.value)}
                      defaultValue={props.GiaGocSP}
                      style={{ borderColor: colorGiagocspfix }}
                      onBlur={() => validateGiagocSpfix(GiaGocSPFix)}
                      required
                    />
                    <label className="form__label">Giá gốc</label>
                  </div>
                  <ErrorGiagocSpfix
                    isHidden={giagocspCheckfix}
                    ErrorGiagocSpfix={errorGiagocspfix} />
                </div>
                <div className="ipt_validate_sp">
                  <div className="form_Product">
                    <input type="text" className="form__input" placeholder=" " name="Giá bán"
                      onChange={(e) => setGiaBanSPFix(e.target.value)}
                      defaultValue={props.GiaBanSP}
                      style={{ borderColor: colorGiabanspfix }}
                      onBlur={() => validateGiabanSpfix(GiaBanSPFix)}
                      required
                    />
                    <label className="form__label">Giá bán</label>
                  </div>
                  <ErrorGiabanSpfix
                    isHidden={giabanspCheckfix}
                    ErrorGiabanSpfix={errorGiabanspfix} />
                </div>
              </div>
              <div className="frames_pro_fix_bottom_right">
                <div className="ipt_validate_sp">
                  <div className="form_Product">
                    <input type="text" className="form__input" placeholder=" " name="Số lượng"
                      onChange={(e) => setSoLuongSPFix(e.target.value)}
                      defaultValue={props.SoLuongSP}
                      style={{ borderColor: colorSoluongspfix }}
                      onBlur={() => validateSoluongSpfix(SoLuongSPFix)}
                      required
                    />
                    <label className="form__label">Số lượng</label>
                  </div>
                  <ErrorSoluongSpfix
                    isHidden={soluongspCheckfix}
                    ErrorSoluongSpfix={errorSoluongspfix} />
                </div>
                <div className="ipt_validate_sp_area">
                  <div className="form_mota_Product_fix">
                    <textarea onChange={(e) => setChiTietSPFix(e.target.value)}
                      defaultValue={props.ChiTietSP}
                      title=""
                      placeholder="Mô tả" name="thông tin" className="form_mota_Product_fix" rows="6"
                      style={{ borderColor: colorMotaspfix }}
                      onBlur={(e) => validateMotaSpfix(e.target.value)}
                      required
                    />
                  </div>
                  <ErrorMotaspfix
                    isHidden={motaspCheckfix}
                    ErrorMotaspfix={errorMotaspfix} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="btn-dialog-sp-fix">
        <Button variant="outlined" className="btn_add_cancel_sp_fix" onClick={handleCloseHuy}>Hủy</Button>
        <Button variant="outlined" className="btn_add_cancel_sp_fix" color="primary" onClick={UploadMultipleFiles}>
          Sửa
        </Button>
      </DialogActions>
    </Dialog>
  )
}