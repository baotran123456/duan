import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Button,
} from '@mui/material';


import axios from "axios";

export default function Add_SaleSP(props) {

  const ip = "http://localhost:8080"

  // const [,set] = useState("")
  const [NameSaleSP, setNameSaleSP] = useState("")
  const [PhanTramGiamGia, setPhanTramGiamGia] = useState(0)
  const [NgayTaoSale, setNgayTaoSale] = useState()
  const [NgayEndSale, setNgayEndSale] = useState()
  const [TrangThaiSale, setTrangThaiSale] = useState("Hoạt động")

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
      setChxBtnName(false)
      setErrorSale("Tên giảm giá không được để trống");
    }
    if (se.length == 0) {
      setSaleCheck(false);
      setColorSale("red");
      setChxBtnName(false)
      setErrorSale("Tên giảm giá không được để trống");
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
      setChxBtn(false)
      setErrorPercent("Phần trăm giảm giá không được để trống");
    }
    if (se == 0) {
      setPercentCheck(false);
      setColorPercent("red");
      setChxBtn(false)
      setErrorPercent("Phần trăm giảm giá không được để trống");
    }
    if (se.length == 0) {
      setPercentCheck(false);
      setColorPercent("red");
      setChxBtn(false)
      setErrorPercent("Phần trăm giảm giá không được để trống");
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
  const [colorDateStart, setColorDateStart] = useState("#d8dde1");
  const [dateStartCheck, setDateStartCheck] = useState(true);
  const [errorDateStart, setErrorDateStart] = useState("");
  const [chxBtnDateStart, setChxBtnDateStart] = useState();
  const validateDateStart = (se) => {
    if (se != null) {
      setMin(se)
      setDateStartCheck(true)
      setColorDateStart("#d8dde1")
      setErrorDateStart("")
      setChxBtnDateStart(true)
    }
    if (se == null || NgayTaoSale == null) {
      setDateStartCheck(false)
      setColorDateStart("red")
      setErrorDateStart("Chưa nhập ngày tạo giảm giá")
      setChxBtnDateStart(false)
    }

  }
  function ErrorDateStart(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorDateStart}
      </div>
    )
  }

  // ngay End
  const [colorDateEnd, setColorDateEnd] = useState("#d8dde1");
  const [dateEndCheck, setDateEndCheck] = useState(true);
  const [errorDateEnd, setErrorDateEnd] = useState("");
  const [chxBtnDateEnd, setChxBtnDateEnd] = useState();
  const validateDateEnd = (se) => {
    if (se != null) {
      setMax(se)
      setDateEndCheck(true)
      setColorDateEnd("#d8dde1")
      setErrorDateEnd("")
      setChxBtnDateEnd(true)
    }
    if (se == null || NgayEndSale == null) {
      setDateEndCheck(false)
      setColorDateEnd("red")
      setChxBtnDateEnd(false)
      setErrorDateEnd("Chưa nhập ngày kết thúc giảm giá")
    }
  }
  function ErrorDateEnd(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.ErrorDateEnd}
      </div>
    )
  }

  const btnAdd_SaleSP = () => {
    if (chxBtnDateEnd == true && chxBtnDateStart == true && chxBtnName == true && chxBtnSale == true) {
      axios.post(ip + "/add_SaleSP", {
        NameSaleSP: NameSaleSP,
        PhanTramGiamGia: PhanTramGiamGia,
        NgayTaoSale: NgayTaoSale,
        NgayEndSale: NgayEndSale,
        TrangThaiSale: TrangThaiSale,
      })
      handleClose();
    } else {
      validateNameSale(NameSaleSP);
      validatePercentSale(PhanTramGiamGia);
      validateDateStart(NgayTaoSale);
      validateDateEnd(NgayEndSale);
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

    // ngay tao
    if (dayStart < 10) {
      setTokenDayStart("-0")
    } else {
      setTokenDayStart("-")
    }
    if (monthStart < 10) {
      setTokenMonthStart("-0")
    } else {
      setTokenMonthStart("-")
    }

    // ngay end
    if (dayEnd < 10) {
      setTokenDayEnd("-0")
    } else {
      setTokenDayEnd("-")
    }
    if (monthEnd < 10) {
      setTokenMonthEnd("-0")
    } else {
      setTokenMonthEnd("-")
    }

    if (props.open == false) {
      //  giá trị về mặc định
      setNameSaleSP("")
      setPhanTramGiamGia(0)
      setNgayTaoSale()
      setNgayEndSale()
      setMin()
      setMax()
      setTrangThaiSale("Hoạt động")
      // check validate về ẩn
      setSaleCheck(true)
      setPercentCheck(true)
      setDateStartCheck(true)
      setDateEndCheck(true)
      // setColor về mặc định
      setColorSale("#d8dde1")
      setColorPercent("#d8dde1")
      setColorDateStart("#d8dde1")
      setColorDateEnd("#d8dde1")
      // setButton add ve rong
      setChxBtnName()
      setChxBtnDateEnd()
      setChxBtn()
      setChxBtnDateStart()
    }
  })

  //  format ngay Start
  var formatHT = new Date();

  var dayHT = formatHT.getDate();
  var monthHT = formatHT.getMonth() + 1;
  var yearHT = formatHT.getFullYear();

  var dateHT = yearHT + "-" + monthHT + "-" + dayHT;

  //  format ngay Start
  var formatStart = new Date(NgayTaoSale);

  var dayStart = formatStart.getDate();
  var monthStart = formatStart.getMonth() + 1;
  var yearStart = formatStart.getFullYear();

  var dateStart = yearStart + `${tokenMonthStart}` + monthStart + `${tokenDayStart}` + dayStart;

  //  format ngay end
  var formatEnd = new Date(NgayEndSale);

  var dayEnd = formatEnd.getDate();
  var monthEnd = formatEnd.getMonth() + 1;
  var yearEnd = formatEnd.getFullYear();
  var dateEnd = yearEnd + `${tokenMonthEnd}` + monthEnd + `${tokenDayEnd}` + dayEnd;

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
          <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Thêm thông tin mã giảm giá</h2>
          <div className="frames_sale">
            <div className="sale_left">
              <div className="sale_left_top">
                <div className="form">
                  <input type="text" className="form__input" placeholder=" "
                    onChange={(e) => setNameSaleSP(e.target.value)}
                    style={{ borderColor: colorSale }}
                    onBlur={(e) => validateNameSale(e.target.value)}
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
                  <input type="text" className="form__input" placeholder=" "
                    onChange={(e) => setPhanTramGiamGia(e.target.value)}
                    style={{ borderColor: colorPercent }}
                    onBlur={(e) => validatePercentSale(e.target.value)}
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
                    style={{ borderColor: colorDateEnd }}
                    min={min}
                    onChange={(e) => setNgayEndSale(e.target.value)}
                    onBlur={() => validateDateEnd(dateEnd)}
                  />
                  <label className="form__label">Ngày kết thúc</label>
                </div>
                <ErrorDateEnd
                  isHidden={dateEndCheck}
                  ErrorDateEnd={errorDateEnd} />
              </div>
              <div className="sale_right_top">
                <div className="form_dateGG">
                  <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                    style={{ borderColor: colorDateStart }}
                    max={max}
                    onChange={(e) => setNgayTaoSale(e.target.value)}
                    onBlur={() => validateDateStart(dateStart)}
                  />
                  <label className="form__label">Ngày tạo</label>
                </div>
                <ErrorDateStart
                  isHidden={dateStartCheck}
                  ErrorDateStart={errorDateStart} />
              </div>

              <div className="form_trangthai">
                <select defaultValue={TrangThaiSale} onChange={(e) => setTrangThaiSale(e.target.value)}>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Không hoạt động">Không hoạt động </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </DialogContent >
      <DialogActions className="btn-dialog-sale">
        <Button variant="outlined" className="btn_add_cancel_sale" onClick={handleCloseHuy}>Hủy</Button>
        <Button variant="outlined" className="btn_add_cancel_sale" color="primary" onClick={btnAdd_SaleSP}>Thêm</Button>

      </DialogActions>
    </Dialog >
  )
}