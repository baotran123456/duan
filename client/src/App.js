// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function App() {

  const navigate = useNavigate();

  const [pathLogin, setPathLogin] = useState("/login");
  const [pathRegister, setPathRegister] = useState("/register");
  const [pathUser, setPathUser] = useState("aaa");
  const [pathProducts, setPathProducts] = useState("aaa");
  const [pathLoaiSP, setPathLoaiSP] = useState("aaa");
  const [pathSaleSP, setPathSaleSP] = useState("aaa");
  const [pathBlog, setPathBlog] = useState("aaa");
  const [pathDanhThu, setPathDoanhThu] = useState("aaa");
  const [pathPhanHoi, setPathPhanHoi] = useState("aaa");
  const [pathTrangThai, setPathTrangThai] = useState("aaa");



  useEffect(() => {
    var getUser = localStorage.getItem("User")
    var getUser2 = localStorage.getItem("User2")
    var data = JSON.parse(getUser)
    var data2 = JSON.parse(getUser2)

    if (getUser == null) {
    }

    if (getUser2 != null && data2.chxSave == false) {
      setPathLogin("aaa")
      setPathRegister("aaa")
      setPathUser("user")
      setPathProducts("products")
      setPathLoaiSP("loaisp")
      setPathSaleSP("salesp")
      setPathBlog("blog")
      setPathDoanhThu("doanhthu")
      setPathPhanHoi("phanhoi")
      setPathTrangThai("trangthai")
      return localStorage.removeItem("User2")
    }
    if (getUser != null && data.chxSave == true) {
      fetch("http://localhost:8080/login-admin", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          taikhoan: data.TKLocal,
          pass: data.PassLocal,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "oke") {
            window.localStorage.setItem("token", data.data);
            setPathLogin("aaa")
            setPathRegister("aaa")
            setPathUser("user")
            setPathProducts("products")
            setPathLoaiSP("loaisp")
            setPathSaleSP("salesp")
            setPathBlog("blog")
            setPathDoanhThu("doanhthu")
            setPathPhanHoi("phanhoi")
            setPathTrangThai("trangthai")
          }
        })
    }
  },)

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router
        pathLogin={pathLogin}
        pathRegister={pathRegister}
        pathUser={pathUser}
        pathProducts={pathProducts}
        pathLoaiSP={pathLoaiSP}
        pathSaleSP={pathSaleSP}
        pathBlog={pathBlog}
        pathDanhThu={pathDanhThu}
        pathPhanHoi={pathPhanHoi}
        pathTrangThai={pathTrangThai}
      />
    </ThemeProvider>
  );
}
