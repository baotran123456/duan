import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';

import eyeStart from '../login/eye_icon.png'
import eyeEnd from '../login/eye_slash_icon.png';

import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------
function useKey(key, cb) {

  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  })

  useEffect(() => {

    function handle(event) {
      if (event.code === key) {
        callbackRef.current(event);
      }
    }

    document.addEventListener("keypress", handle);
    return () => document.removeEventListener("keypress", handle);
  }, [key])
}

export default function LoginForm() {

  const navigate = useNavigate();

  const [taikhoan, setTK] = useState("");
  const [pass, setPass] = useState("");

  const [chxSave, setChxSave] = useState(false);

  const btnLogin = async () => {


    // console.log(taikhoan, pass, chxSave);

    fetch("http://localhost:8080/login-admin", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        taikhoan: taikhoan,
        pass: pass,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "userLogin");
        if (data.error == "Tài khoản không tồn tại") {
          setTKCheck(false);
          setColor2("red");
          setErrorTK("Tài khoản không tồn tại");
        }
        if (data.error == "Mật khẩu sai") {
          setPasswordCheck(false);
          setColor3("red");
          setErrorPassword("Mật khẩu sai");
        }
        if (data.status == "oke") {
          if (chxSave == true) {
            window.localStorage.setItem("token", data.data);
            window.location.href = "/dashboard/app"
            var user = {
              TKLocal: taikhoan,
              PassLocal: pass,
              chxSave: chxSave
            }
            localStorage.setItem('User', JSON.stringify(user));
            window.localStorage.setItem("token", data.data);
            window.location.href = "/dashboard/app"

          } else if (chxSave == false) {
            window.localStorage.setItem("token", data.data);
            window.location.href = "/dashboard/app"
            var user = {
              TKLocal: taikhoan,
              PassLocal: pass,
              chxSave: chxSave
            }
            localStorage.setItem('User2', JSON.stringify(user));
          }
        }

      })
  };


  // ten dang nhap
  const [color2, setColor2] = useState("#d8dde1");
  const [TKCheck, setTKCheck] = useState(true);
  const [errorTK, setErrorTK] = useState("");
  const validateTK = (se) => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(se) == false) {
      setTKCheck(true);
      setColor2("#d8dde1");
      setErrorTK("");

    } else {
      setTKCheck(false);
      setColor2("red");
      setErrorTK("Vui lòng không điền kí tự đặt biệt");
    }

    if (se.length > 50) {
      setTKCheck(false);
      setColor2("red");
      setErrorTK("Tài khoản dài quá 50 kí tự");
    }
    if (se.length < 5 && se.length > 0) {
      setTKCheck(false);
      setColor2("red");
      setErrorTK("Độ dài tài khoản lớn hơn 5 kí tự");
    }
    if (se.length == 0) {
      setTKCheck(false);
      setColor2("red");
      setErrorTK("Tài khoản không được để trống");
    }
  }
  function ErrorTK(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.errorTK}
      </div>
    )
  }


  // mat khau
  const [color3, setColor3] = useState("#d8dde1");
  const [passwordCheck, setPasswordCheck] = useState(true);
  const [errorPassword, setErrorPassword] = useState("");
  const validatePass = (se) => {
    const pass = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (pass.test(se) == false) {
      setPasswordCheck(true);
      setColor3("#d8dde1");
      setErrorPassword("");
    } else {
      setPasswordCheck(false);
      setColor3("red");
      setErrorPassword("Vui lòng không điền kí tự đặt biệt");
    }

    if (se.length > 50) {
      setPasswordCheck(false);
      setColor3("red");
      setErrorPassword("Mật khẩu dài quá 50 kí tự");
    }
    if (se.length < 5 && se.length > 0) {
      setPasswordCheck(false);
      setColor3("red");
      setErrorPassword("Độ dài Mật khẩu lớn hơn 5 kí tự");
    }
    if (se.length == 0) {
      setPasswordCheck(false);
      setColor3("red");
      setErrorPassword("Mật khẩu không được để trống");
    }
  }
  function ErrolPassword(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.errorPassword}
      </div>
    )
  }

  // con mắt password
  const [type, setType] = useState("password");
  const [eye, setEye] = useState(eyeStart);
  const hanldeEye = () => {
    if (eye == eyeStart) {
      setType("text")
      setEye(eyeEnd)
      return
    }
    if (eye == eyeEnd) {
      setType("password")
      setEye(eyeStart)
      return
    }
  }



  return (
    <div className="container">

      <div className="user" >
        <input type="text" className="form__input" style={{ borderColor: color2 }} placeholder=" " name="Tên đăng nhập"
          onChange={(e) => setTK(e.target.value)}
          onClick={useKey("Enter", btnLogin)}
          onBlur={(e) => validateTK(e.target.value)}
          required />
        <label htmlFor="text" className="form__label">Tên đăng nhập</label>
        <ErrorTK
          isHidden={TKCheck}
          errorTK={errorTK} />

      </div>
      <div className="user">
        <input type={type} className="form__input" style={{ borderColor: color3 }} placeholder=" " name="Tên đăng nhập"
          onChange={(e) => setPass(e.target.value)}
          onClick={useKey("Enter", btnLogin)}
          onBlur={(e) => validatePass(e.target.value)}
          required />

        <label htmlFor="email" className="form__label">Mật khẩu</label>

        <img onClick={hanldeEye} src={eye} width='25' height='25' />

        <ErrolPassword
          isHidden={passwordCheck}
          errorPassword={errorPassword} />

      </div>
      <div className="cbx">
        <div className='cbx_1'>
          <input className='cbx_ipt' name="rememberme" type="checkbox" onChange={(e) => setChxSave(!chxSave)} defaultChecked={chxSave} />
          <p> Lưu mật khẩu</p>
        </div>
        <a className='cbx_2' href='/login'>
          Forgot password?
        </a>
      </div>

      <Button className='btn' variant="contained" onClick={btnLogin} onChange={useKey("Enter", btnLogin)}>Đăng nhập</Button>


    </div >
  );
}
