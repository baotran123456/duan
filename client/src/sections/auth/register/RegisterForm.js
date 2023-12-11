
import { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// import

import eyeStart from '../login/eye_icon.png'
import eyeEnd from '../login/eye_slash_icon.png';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();



  const [uname, setName] = useState("");
  const [taikhoan, setTK] = useState("");
  const [pass, setPassword] = useState("");


  const btnRegister = async () => {

    if (nameCheck == true && TKCheck == true && passwordCheck == true) {

      // console.log(uname,taikhoan,pass);

      fetch("http://localhost:8080/register-admin", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          uname: uname,
          taikhoan: taikhoan,
          pass: pass,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data,"userResgister");
          if (data.error == "Trùng tài khoản") {
            setTKCheck(false);
            setColor2("red");
            setErrorTK("Tài khoản đã tồn tại");
          } else {
            navigate('/login', { replace: true });

          }
        })

    }

  };

  // --------------------------------------validate------------------------------------------------

  // ten
  const [nameCheck, setNameCheck] = useState(true);
  const [errorName, setErrorName] = useState("");
  const [color1, setColor1] = useState("#d8dde1");
  const validateName = (se) => {
    const name = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (name.test(se) == false) {
      setNameCheck(true);
      setColor1("#d8dde1");
      setErrorName("");
    } else {
      setNameCheck(false);
      setColor1("red");
      setErrorName("Vui lòng không điền kí tự đặt biệt");
    }
    if (se.length > 50) {
      setNameCheck(false);
      setColor1("red");
      setErrorName("Tên dài quá 50 kí tự");
    }
    if (se.length < 5 && se.length > 0) {
      setNameCheck(false);
      setColor1("red");
      setErrorName("Độ dài Tên lớn hơn 5 kí tự");
    }
    if (se.length == 0) {
      setNameCheck(false);
      setColor1("red");
      setErrorName("Tên không được để trống");
    }
  }
  function ErrorName(props) {
    if (props.isHidden) { return null; }
    return (
      <div className="form_warning">
        {props.errorName}
      </div>
    )
  }

  // ten dang nhap
  const [color2, setColor2] = useState("#d8dde1");
  const [TKCheck, setTKCheck] = useState(true);
  const [errorTK, setErrorTK] = useState("");
  const validateTK = (se) => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    // const format = "";

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
      {/* ten */}
      <div className="user" >
        <input type="text" className="form__input" style={{ borderColor: color1 }} placeholder=" " name="Tên đăng nhập"
          onChange={(e) => setName(e.target.value)}
          onBlur={(e) => validateName(e.target.value)}
          required />
        <label htmlFor="name" className="form__label">Tên </label>
        <ErrorName
          isHidden={nameCheck}
          errorName={errorName} />
      </div>
      {/* ten user */}
      <div className="user" >
        <input type="text" className="form__input" style={{ borderColor: color2 }} placeholder=" " name="Tên đăng nhập"
          onChange={(e) => setTK(e.target.value)}
          onBlur={(e) => validateTK(e.target.value)}
          required />
        <label htmlFor="text" className="form__label">Tên đăng nhập</label>
        <ErrorTK
          isHidden={TKCheck}
          errorTK={errorTK} />
      </div>
      {/* pass */}
      <div className="user">
        <input type={type} className="form__input" style={{ borderColor: color3 }} placeholder=" " name="Tên đăng nhập"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => validatePass(e.target.value)}
          required /><label htmlFor="email" className="form__label">Mật khẩu</label>
        <img onClick={hanldeEye} src={eye} width='25' height='25' />
        <ErrolPassword
          isHidden={passwordCheck}
          errorPassword={errorPassword} />
      </div>

      <Button className='btn' variant="contained" onClick={btnRegister}>Đăng ký</Button>
    </div >
  );
}
