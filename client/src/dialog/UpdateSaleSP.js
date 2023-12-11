import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Button,

} from '@mui/material';
import axios from "axios";

export default function UpdateSaleSP(props) {

  const ip = "http://localhost:8080"

  const [NameSaleSPFix, setNameSaleSPFix] = useState(props.NameSaleSP)
  const [PhanTramGiamGiaFix, setPhanTramGiamGiaFix] = useState(props.PhanTramGiamGia)
  const [NgayTaoSaleFix, setNgayTaoSaleFix] = useState(props.NgayTaoSale)
  const [NgayEndSaleFix, setNgayEndSaleFix] = useState(props.NgayEndSale)
  const [TrangThaiSaleFix, setTrangThaiSaleFix] = useState(props.TrangThaiSale)
  const [tokenDayStart, setTokenDayStart] = useState("")
  const [tokenMonthStart, setTokenMonthStart] = useState("")

  const [tokenDayEnd, setTokenDayEnd] = useState("")
  const [tokenMonthEnd, setTokenMonthEnd] = useState("")

  const [max, setMax] = useState("")
  const [min, setMin] = useState("")

  // ten giam gia
  const [colorSale, setColorSale] = useState("#d8dde1");
  const [saleCheck, setSaleCheck] = useState(true);
  const [errorSale, setErrorSale] = useState("");
  const [chxBtnName, setChxBtnName] = useState();
  const validateNameSale = (se) => {
    if (se != null) {
      setSaleCheck(true);
      setColorSale("#d8dde1");
      setErrorSale("");
      setChxBtnName(true)
    }
    if (se == null) {
      setSaleCheck(false);
      setColorSale("red");
      setErrorSale("Tên giảm giá không được để trống");
      setChxBtnName(false)
    }
    if (se.length == 0) {
      setSaleCheck(false);
      setColorSale("red");
      setErrorSale("Tên giảm giá không được để trống");
      setChxBtnName(false)

    }
  }
  function ErrorNameSale(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorNameSale}
      </div>
    )
  }


  // % giam gia
  const [colorPercent, setColorPercent] = useState("#d8dde1");
  const [percentCheck, setPercentCheck] = useState(true);
  const [errorPercent, setErrorPercent] = useState("");

  const [chxBtnSale, setChxBtn] = useState();
  const validatePercentSale = (se) => {

    if (se != null) {
      setPercentCheck(true);
      setColorPercent("#d8dde1");
      setErrorPercent("");
      setChxBtn(true)
    }
    if (se == null) {
      setPercentCheck(false);
      setColorPercent("red");
      setErrorPercent("Phần trăm giảm giá không được để trống");
      setChxBtn(false)
    }

    if (se == 0) {
      setPercentCheck(false);
      setColorPercent("red");
      setErrorPercent("Phần trăm giảm giá không được để trống");
      setChxBtn(false)
    }
    if (se.length == 0) {
      setPercentCheck(false);
      setColorPercent("red");
      setErrorPercent("Phần trăm giảm giá không được để trống");
      setChxBtn(false)
    }
  }
  function ErrorPercentSale(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorNameSale}
      </div>
    )
  }

  // ngay Start
  const [dateStartCheck, setDateStartCheck] = useState(true);
  const [chxBtnDateStart, setChxBtnDateStart] = useState(true);
  const validateDateStart = (se) => {
    if (se != null) {
      setMin(se)
      setDateStartCheck(true)
    }
  }


  // ngay End
  const [dateEndCheck, setDateEndCheck] = useState(true);
  const [chxBtnDateEnd, setChxBtnDateEnd] = useState(true);
  const validateDateEnd = (se) => {
    if (se != null) {
      setMax(se)
      setDateEndCheck(true)
    }
  }


  useEffect(() => {
    validateNameSale(NameSaleSPFix);
    validatePercentSale(PhanTramGiamGiaFix);
    validateDateStart(NgayTaoSaleFix);
    validateDateEnd(NgayEndSaleFix);
    // ngay tao
    if (dayStartBF < 10) {
      setTokenDayStart("-0")
    } else {
      setTokenDayStart("-")
    }
    if (monthStartBF < 10) {
      setTokenMonthStart("-0")
    } else {
      setTokenMonthStart("-")
    }

    // ngay end
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
      setSaleCheck(true)
      setPercentCheck(true)
      setDateStartCheck(true)
      setDateEndCheck(true)
      // setColor về mặc định
      setColorSale("#d8dde1")
      setColorPercent("#d8dde1")
      // setButton add ve rong
      setChxBtnName()
      setChxBtn()
    }
  })
  const btnUpdate_SaleSP = () => {
    // console.log(chxBtnName, chxBtnSale);
    if (chxBtnName == null && chxBtnSale == null) {
      validateNameSale(NameSaleSPFix);
      validatePercentSale(PhanTramGiamGiaFix);
      validateDateStart(NgayTaoSaleFix);
      validateDateEnd(NgayEndSaleFix);
      return
    } else
      if (chxBtnName == true && chxBtnSale == true) {
        axios.put(ip + `/UpdateSaleSP/${props._id}`, {
          NameSaleSP: NameSaleSPFix,
          PhanTramGiamGia: PhanTramGiamGiaFix,
          NgayTaoSale: NgayTaoSaleFix,
          NgayEndSale: NgayEndSaleFix,
          TrangThaiSale: TrangThaiSaleFix,
        })
        handleClose();
      }
  }




  //  format ngay Start
  var formatStartBF = new Date(NgayTaoSaleFix);

  var dayStartBF = formatStartBF.getDate();
  var monthStartBF = formatStartBF.getMonth() + 1;
  var yearStartBF = formatStartBF.getFullYear();

  var dateStartBF = yearStartBF + `${tokenMonthStart}` + monthStartBF + `${tokenDayStart}` + dayStartBF;

  //  format ngay end
  var formatEndBF = new Date(NgayEndSaleFix);

  var dayEndBF = formatEndBF.getDate();
  var monthEndBF = formatEndBF.getMonth() + 1;
  var yearEndBF = formatEndBF.getFullYear();
  var dateEndBF = yearEndBF + `${tokenMonthEnd}` + monthEndBF + `${tokenDayEnd}` + dayEndBF;


  const handleClose = () => {
    props.setOpen(false);
    props.setShowBtn("update")
  };
  const handleClose_no_update = () => {
    props.setOpen(false);
    props.setShowBtn("no_update")
  }
  const handleCloseHuy = () => {
    props.setOpen(false);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogContent>
        <div className="container-up" >
          <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Sửa thông tin mã giảm giá</h2>

          <div className="frames_sale">
            <div className="sale_left">
              <div className="sale_left_top">
                <div className="form">
                  <input type="text" className="form__input" placeholder=" " name="Tên áo"
                    onChange={(e) => setNameSaleSPFix(e.target.value)}
                    defaultValue={props.NameSaleSP}
                    style={{ borderColor: colorSale }}
                    onBlur={() => validateNameSale(NameSaleSPFix)}
                    required
                  />
                  <label className="form__label">Tên giảm giá</label>
                </div>
                <ErrorNameSale
                  isHidden={saleCheck}
                  ErrorNameSale={errorSale} />
              </div>
              <div className="sale_left_top">
                <div className="form">
                  <input type="text" className="form__input" placeholder=" " name="Tên áo"
                    onChange={(e) => setPhanTramGiamGiaFix(e.target.value)}
                    defaultValue={props.PhanTramGiamGia}
                    style={{ borderColor: colorPercent }}
                    onBlur={() => validatePercentSale(PhanTramGiamGiaFix)}
                    required
                  />
                  <label className="form__label">Phần trăm giảm giá</label>
                </div>
                <ErrorPercentSale
                  isHidden={percentCheck}
                  ErrorNameSale={errorPercent} />
              </div>

              <div className="sale_right_top">
                <div className="form_dateGG">
                  <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                    defaultValue={dateEndBF}
                    min={min}
                    onChange={(e) => setNgayEndSaleFix(e.target.value)}
                    onBlur={() => validateDateEnd(dateEndBF)}
                  />
                  <label className="form__label">Ngày kết thúc</label>
                </div>
              </div>
              <div className="sale_right_top">
                <div className="form_dateGG">
                  <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                    defaultValue={dateStartBF}
                    max={max}
                    onChange={(e) => setNgayTaoSaleFix(e.target.value)}
                    onBlur={() => validateDateStart(dateStartBF)}
                  />
                  <label className="form__label">Ngày tạo</label>
                </div>
              </div>
              <div className="form_trangthai">
                <select defaultValue={props.TrangThaiSale} onChange={(e) => setTrangThaiSaleFix(e.target.value)}>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Không hoạt động">Không hoạt động </option>
                </select>
              </div>
            </div>
          </div>

        </div>
      </DialogContent>
      <DialogActions className="btn-dialog-sale">
        <Button variant="outlined" className="btn_add_cancel_sale" onClick={handleCloseHuy}>Hủy</Button>
        <Button variant="outlined" className="btn_add_cancel_sale" color="primary" onClick={btnUpdate_SaleSP}>
          Sửa
        </Button>
      </DialogActions>
    </Dialog>
  )
}