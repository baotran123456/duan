import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
    Button,
} from '@mui/material';


import axios from "axios";
import $ from "jquery";

export default function AddBlog(props) {

    const ip = "http://localhost:8080"

    // const [,set] = useState("")
    const [DateBlog, setDateBlog] = useState()
    const [TenBlog, setTenBlog] = useState("")
    const [LikeBlog, setLikeBlog] = useState("")
    const [CmtBlog, setCmtBlog] = useState("")
    const [ShareBlog, setShareBlog] = useState("")

    //  format ngay 
    const [tokenDayStart, setTokenDayStart] = useState("")
    const [tokenMonthStart, setTokenMonthStart] = useState("")

    //  format ngay 
    var formatStart = new Date(DateBlog);

    var dayStart = formatStart.getDate();
    var monthStart = formatStart.getMonth() + 1;
    var yearStart = formatStart.getFullYear();

    var dateStart = yearStart + `${tokenMonthStart}` + monthStart + `${tokenDayStart}` + dayStart;

    // ngay
    const [colorDateStart, setColorDateStart] = useState("#d8dde1");
    const [dateStartCheck, setDateStartCheck] = useState(true);
    const [errorDateStart, setErrorDateStart] = useState("");
    const [chxBtnDateStart, setChxBtnDateStart] = useState();
    const validateDateStart = (se) => {
        if (se != null) {
            setDateStartCheck(true)
            setColorDateStart("#d8dde1")
            setErrorDateStart("")
            setChxBtnDateStart(true)
        }
        if (se == null || DateBlog == null) {
            setDateStartCheck(false)
            setColorDateStart("red")
            setErrorDateStart("Chưa nhập ngày blog")
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
    // ten blog
    const [colorNameblog, setColorNameblog] = useState("#d8dde1");
    const [nameblogCheck, setNameblogCheck] = useState(true);
    const [errorNameblog, setErrorNameblog] = useState("");
    const [chxBtnNameBlog, setChxBtnNameBlog] = useState();
    const validateNameBlog = (se) => {
        if (se != null) {
            setNameblogCheck(true);
            setColorNameblog("#d8dde1");
            setErrorNameblog("");
            setChxBtnNameBlog(true)
        }
        if (se == "") {
            setNameblogCheck(false);
            setColorNameblog("red");
            setErrorNameblog("Tên blog không được để trống");
            setChxBtnNameBlog(false)
        }
    }
    function Error_NameBlog(props) {
        if (props.isHidden) { return null; }
        return (
            <div className="form_warning">
                {props.Error_NameBlog}
            </div>
        )
    }
    // yêu thích blog
    const [colorLikeblog, setColorLikeblog] = useState("#d8dde1");
    const [likeblogCheck, setLikeblogCheck] = useState(true);
    const [errorLikeblog, setErrorLikeblog] = useState("");
    const [chxBtnLikeblog, setChxBtnLikeblog] = useState();
    const validateLikeblog = (se) => {
        if (se != null) {
            setLikeblogCheck(true);
            setColorLikeblog("#d8dde1");
            setErrorLikeblog("");
            setChxBtnLikeblog(true)
        }
        if (se == "") {
            setLikeblogCheck(false);
            setColorLikeblog("red");
            setErrorLikeblog("Yêu thích blog không được để trống");
            setChxBtnLikeblog(false)
        }
    }
    function Error_LikeBlog(props) {
        if (props.isHidden) { return null; }
        return (
            <div className="form_warning">
                {props.Error_LikeBlog}
            </div>
        )
    }
    // bình luận blog
    const [colorCmtblog, setColorCmtblog] = useState("#d8dde1");
    const [cmtblogCheck, setCmtblogCheck] = useState(true);
    const [errorCmtblog, setErrorCmtblog] = useState("");
    const [chxBtnCmtBlog, setChxBtnCmtBlog] = useState();
    const validateCmtBlog = (se) => {
        if (se != null) {
            setCmtblogCheck(true);
            setColorCmtblog("#d8dde1");
            setErrorCmtblog("");
            setChxBtnCmtBlog(true)
        }
        if (se == "") {
            setCmtblogCheck(false);
            setColorCmtblog("red");
            setErrorCmtblog("Bình luận blog không được để trống");
            setChxBtnCmtBlog(false)
        }
    }
    function Error_CmtBlog(props) {
        if (props.isHidden) { return null; }
        return (
            <div className="form_warning">
                {props.Error_CmtBlog}
            </div>
        )
    }
    // chia sẻ blog
    const [colorShareblog, setColorShareblog] = useState("#d8dde1");
    const [shareblogCheck, setShareblogCheck] = useState(true);
    const [errorShareblog, setErrorShareblog] = useState("");
    const [chxBtnShareBlog, setChxBtnShareBlog] = useState();
    const validateShareBlog = (se) => {
        if (se != null) {
            setShareblogCheck(true);
            setColorShareblog("#d8dde1");
            setErrorShareblog("");
            setChxBtnShareBlog(true)
        }
        if (se == "") {
            setShareblogCheck(false);
            setColorShareblog("red");
            setErrorShareblog("Chia sẻ blog không được để trống");
            setChxBtnShareBlog(false)
        }
    }
    function Error_ShareBlog(props) {
        if (props.isHidden) { return null; }
        return (
            <div className="form_warning">
                {props.Error_ShareBlog}
            </div>
        )
    }


    // ---------------------------------------upload img--------------------------------
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


    const btnAdd_Blog = () => {
        validateDateStart(DateBlog);
        validateNameBlog(TenBlog);
        validateLikeblog(LikeBlog);
        validateCmtBlog(CmtBlog);
        validateShareBlog(ShareBlog);
        if (chxBtnDateStart == true && chxBtnNameBlog == true &&
            chxBtnLikeblog == true && chxBtnCmtBlog == true && chxBtnShareBlog == true) {
            axios.post(ip + "/add_Blog", {
                DateBlog: DateBlog,
                TenBlog: TenBlog,
                LikeBlog: LikeBlog,
                CmtBlog: CmtBlog,
                ShareBlog: ShareBlog,
            })
            handleClose();
        } else {
            validateDateStart(DateBlog);
            validateNameBlog(TenBlog);
            validateLikeblog(LikeBlog);
            validateCmtBlog(CmtBlog);
            validateShareBlog(ShareBlog);
        }
    };

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
        if (props.open == false) {
            //  giá trị về mặc định
            setDateBlog()
            setTenBlog("")
            setLikeBlog("")
            setCmtBlog("")
            setShareBlog("")

            // check validate về ẩn
            setDateStartCheck(true)
            setNameblogCheck(true)
            setLikeblogCheck(true)
            setCmtblogCheck(true)
            setShareblogCheck(true)

            // setColor về mặc định
            setColorDateStart("#d8dde1")
            setColorNameblog("#d8dde1")
            setColorLikeblog("#d8dde1")
            setColorCmtblog("#d8dde1")
            setColorShareblog("#d8dde1")

            // setButton add ve rong
            setChxBtnDateStart()
            setChxBtnNameBlog()
            setChxBtnLikeblog()
            setChxBtnCmtBlog()
            setChxBtnShareBlog()

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
                    <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Thêm Blog</h2>
                    <div className="frames_sale">
                        <div className="blog_left">
                            <div className="form_img_image_blog">
                                {userInfo.filepreview !== null ?
                                    <img style={{ borderRadius: '5px' }} width="100%" height="198" src={userInfo.filepreview} alt="UploadImage" />
                                    : null}
                            </div>
                            <div className="form_img_click_blog">
                                <input type="file" name="upload_file" onChange={handleInputChange} className="custom-file-input" />
                            </div>
                            <div className="sale_left_top">
                                <div className="form_dateGG">
                                    <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                                        onChange={(e) => setDateBlog(e.target.value)}
                                        style={{ borderColor: colorDateStart }}
                                        onBlur={() => validateDateStart(dateStart)}
                                    />
                                    <label className="form__label">Ngày </label>
                                </div>
                                <ErrorDateStart
                                    isHidden={dateStartCheck}
                                    ErrorDateStart={errorDateStart} />
                            </div>
                        </div>
                        <div className="blog_right">
                            <div className="sale_left_top">
                                <div className="form">
                                    <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                        onChange={(e) => setTenBlog(e.target.value)}
                                        defaultValue={props.TenBlog}
                                        style={{ borderColor: colorNameblog }}
                                        onBlur={(e) => validateNameBlog(e.target.value)}
                                        required
                                    />
                                    <label className="form__label">Tên</label>
                                </div>
                                <Error_NameBlog
                                    isHidden={nameblogCheck}
                                    Error_NameBlog={errorNameblog} />
                            </div>
                            <div className="sale_left_top">
                                <div className="form">
                                    <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                        onChange={(e) => setLikeBlog(e.target.value)}
                                        defaultValue={props.LikeBlog}
                                        style={{ borderColor: colorLikeblog }}
                                        onBlur={(e) => validateLikeblog(e.target.value)}
                                        required
                                    />
                                    <label className="form__label">Yêu thích</label>
                                </div>
                                <Error_LikeBlog
                                    isHidden={likeblogCheck}
                                    Error_LikeBlog={errorLikeblog} />
                            </div>
                            <div className="sale_left_top">
                                <div className="form">
                                    <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                        onChange={(e) => setCmtBlog(e.target.value)}
                                        defaultValue={props.CmtBlog}
                                        style={{ borderColor: colorCmtblog }}
                                        onBlur={(e) => validateCmtBlog(e.target.value)}
                                        required
                                    />
                                    <label className="form__label">Bình luận</label>
                                </div>
                                <Error_CmtBlog
                                    isHidden={cmtblogCheck}
                                    Error_CmtBlog={errorCmtblog} />
                            </div>
                            <div className="sale_left_top">
                                <div className="form">
                                    <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                        onChange={(e) => setShareBlog(e.target.value)}
                                        defaultValue={props.ShareBlog}
                                        style={{ borderColor: colorShareblog }}
                                        onBlur={(e) => validateShareBlog(e.target.value)}
                                        required
                                    />
                                    <label className="form__label">Chia sẻ</label>
                                </div>
                                <Error_ShareBlog
                                    isHidden={shareblogCheck}
                                    Error_ShareBlog={errorShareblog} />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions className="btn-dialog">
                <Button variant="outlined" className="btn_add_cancel" onClick={handleCloseHuy}>Hủy</Button>
                <Button variant="outlined" className="btn_add_cancel" color="primary" onClick={btnAdd_Blog}>Thêm</Button>
            </DialogActions>
        </Dialog>
    )
}