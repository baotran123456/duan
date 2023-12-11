import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
    Button,

} from '@mui/material';
import axios from "axios";

export default function UpdateBlog(props) {

    const ip = "http://localhost:8080"

    const [isSucces, setSuccess] = useState(null);
    const [DateBlogFix, setDateBlogFix] = useState(props.DateBlog)
    const [TenBlogFix, setTenBlogFix] = useState(props.TenBlog)
    const [LikeBlogFix, setLikeBlogFix] = useState(props.LikeBlog)
    const [CmtBlogFix, setCmtBlogFix] = useState(props.CmtBlog)
    const [ShareBlogFix, setShareBlogFix] = useState(props.ShareBlog)

    const [ImgFix, setImgFix] = useState()

    //  format ngay fix
    const [tokenDayEnd, setTokenDayEnd] = useState("")
    const [tokenMonthEnd, setTokenMonthEnd] = useState("")
    var formatEndBF = new Date(DateBlogFix);

    var dayEndBF = formatEndBF.getDate();
    var monthEndBF = formatEndBF.getMonth() + 1;
    var yearEndBF = formatEndBF.getFullYear();
    var dateEndBF = yearEndBF + `${tokenMonthEnd}` + monthEndBF + `${tokenDayEnd}` + dayEndBF;

    // ten blog
    const [colorNameblog, setColorNameblog] = useState("#d8dde1");
    const [nameblogCheck, setNameblogCheck] = useState(true);
    const [errorNameblog, setErrorNameblog] = useState("");
    const [chxBtnNameBlog, setChxBtnNameBlog] = useState();
    const validateNameBlog = (bl) => {
        if (bl != null) {
            setNameblogCheck(true);
            setColorNameblog("#d8dde1");
            setErrorNameblog("");
            setChxBtnNameBlog(true)
        }
        if (bl == null) {
            setNameblogCheck(false);
            setColorNameblog("red");
            setErrorNameblog("Tên blog không được để trống");
            setChxBtnNameBlog(false)
        }
        if (bl.length == 0) {
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
    const validateLikeblog = (bl) => {
        if (bl != null) {
            setLikeblogCheck(true);
            setColorLikeblog("#d8dde1");
            setErrorLikeblog("");
            setChxBtnLikeblog(true)
        }
        if (bl == null) {
            setLikeblogCheck(false);
            setColorLikeblog("red");
            setErrorLikeblog("Yêu thích blog không được để trống");
            setChxBtnLikeblog(false)
        }
        if (bl.length == 0) {
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
    const validateCmtBlog = (bl) => {
        if (bl != null) {
            setCmtblogCheck(true);
            setColorCmtblog("#d8dde1");
            setErrorCmtblog("");
            setChxBtnCmtBlog(true)
        }
        if (bl == null) {
            setCmtblogCheck(false);
            setColorCmtblog("red");
            setErrorCmtblog("Bình luận blog không được để trống");
            setChxBtnCmtBlog(false)
        }
        if (bl.length == 0) {
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
    const validateShareBlog = (bl) => {
        if (bl != null) {
            setShareblogCheck(true);
            setColorShareblog("#d8dde1");
            setErrorShareblog("");
            setChxBtnShareBlog(true)
        }
        if (bl == null) {
            setShareblogCheck(false);
            setColorShareblog("red");
            setErrorShareblog("Chia sẻ blog không được để trống");
            setChxBtnShareBlog(false)
        }
        if (bl.length == 0) {
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


        axios.post(ip + "/uploadFileAPI", data)
            .then(res => { // then print response status
                // console.log(res.data);
            });

    }


    useEffect(() => {
        validateNameBlog(TenBlogFix);
        validateLikeblog(LikeBlogFix);
        validateCmtBlog(CmtBlogFix);
        validateShareBlog(ShareBlogFix);

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
            setNameblogCheck(true)
            setLikeblogCheck(true)
            setCmtblogCheck(true)
            setShareblogCheck(true)

            // setColor về mặc định
            setColorNameblog("#d8dde1")
            setColorLikeblog("#d8dde1")
            setColorCmtblog("#d8dde1")
            setColorShareblog("#d8dde1")

            // setButton add ve rong
            setChxBtnNameBlog()
            setChxBtnLikeblog()
            setChxBtnCmtBlog()
            setChxBtnShareBlog()
        }
    })

    const btnUpdate_Blog = () => {
        // axios.put(ip + `/UpdateBlog/${props._id}`, {
        //     DateBlog: DateBlogFix,
        //     TenBlog: TenBlogFix,
        //     LikeBlog: LikeBlogFix,
        //     CmtBlog: CmtBlogFix,
        //     ShareBlog: ShareBlogFix,
        // })
        // handleClose()
        // console.log(test);
        // console.log(chxBtnNameBlog, chxBtnLikeblog, chxBtnCmtBlog, chxBtnShareBlog);
        if (TenBlogFix == props.TenBlog && LikeBlogFix == props.LikeBlog
            && CmtBlogFix == props.CmtBlog && ShareBlogFix == props.ShareBlog
            && chxBtnNameBlog == null && chxBtnLikeblog == null
            && chxBtnCmtBlog == null && chxBtnShareBlog == null) {
            // validateDateStart(DateBlogFix);
            validateNameBlog(TenBlogFix);
            validateLikeblog(LikeBlogFix);
            validateCmtBlog(CmtBlogFix);
            validateShareBlog(ShareBlogFix);
            return
        } else
            if (chxBtnNameBlog == true && chxBtnLikeblog == true
                && chxBtnCmtBlog == true && chxBtnShareBlog == true) {
                axios.put(ip + `/UpdateBlog/${props._id}`, {
                    DateBlog: DateBlogFix,
                    TenBlog: TenBlogFix,
                    LikeBlog: LikeBlogFix,
                    CmtBlog: CmtBlogFix,
                    ShareBlog: ShareBlogFix,
                })
                handleClose();
                // console.log(ImgFix);
            }
    }

    const handleClose = () => {
        props.setOpen(false);
        props.setShowBtn("update")
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
            <DialogContent>
                <div className="container-up" >
                    <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Sửa thông tin Blog</h2>
                    <div className="frames_blogFix">
                        <div className="frames_loaiSp_top">
                            <div className="blog_left_fix">
                                <div className="form_blog_left">
                                    <div className="form_imgblog_left">
                                        <div className="form_img_imageFix_Blog">
                                            <img style={{ borderRadius: '5px' }} width="100%" height="208" src={ip + '/uploads/' + props.ImageBlog}></img>
                                            {isSucces !== null ? <h4> {isSucces} </h4> : null}
                                        </div>
                                    </div>
                                    <div className="form_imgblog_right">
                                        <div className="form_img_imageFix_Blog ">
                                            {userInfo.filepreview !== null ?
                                                <img style={{ borderRadius: '5px' }} width="100%" height="208" src={userInfo.filepreview} alt="UploadImage" />
                                                : null}
                                        </div>
                                        <div className="form_img_clickFix_blog">
                                            {/* <input type="file" name="upload_file" onChange={handleInputChange} className="custom-file-input" /> */}
                                            <input type="file" name="upload_file"
                                                onChange={handleInputChange}
                                                onBlur={(e) => setImgFix(e.target.value)}
                                                className="custom-file-input" />
                                        </div>
                                    </div>
                                </div>
                                <div className="date_blog">
                                    <div className="form_date_blog">
                                        <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                                            defaultValue={dateEndBF}
                                            onChange={(e) => setDateBlogFix(e.target.value)}
                                        />
                                        <label className="form__label">Ngày </label>
                                    </div>
                                </div>
                            </div>
                            <div className="blog_right_fix">
                                <div className="sale_right_top">
                                    <div className="form">
                                        <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                            onChange={(e) => setTenBlogFix(e.target.value)}
                                            defaultValue={props.TenBlog}
                                            style={{ borderColor: colorNameblog }}
                                            onBlur={() => validateNameBlog(TenBlogFix)}
                                            required
                                        />
                                        <label className="form__label">Tên</label>
                                    </div>
                                    <Error_NameBlog
                                        isHidden={nameblogCheck}
                                        Error_NameBlog={errorNameblog} />
                                </div>
                                <div className="sale_right_top">
                                    <div className="form">
                                        <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                            onChange={(e) => setLikeBlogFix(e.target.value)}
                                            defaultValue={props.LikeBlog}
                                            style={{ borderColor: colorLikeblog }}
                                            onBlur={() => validateLikeblog(LikeBlogFix)}
                                            required
                                        />
                                        <label className="form__label">Yêu thích</label>
                                    </div>
                                    <Error_LikeBlog
                                        isHidden={likeblogCheck}
                                        Error_LikeBlog={errorLikeblog} />
                                </div>
                                <div className="sale_right_top">
                                    <div className="form">
                                        <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                            onChange={(e) => setCmtBlogFix(e.target.value)}
                                            defaultValue={props.CmtBlog}
                                            style={{ borderColor: colorCmtblog }}
                                            onBlur={() => validateCmtBlog(CmtBlogFix)}
                                            required
                                        />
                                        <label className="form__label">Comment</label>
                                    </div>
                                    <Error_CmtBlog
                                        isHidden={cmtblogCheck}
                                        Error_CmtBlog={errorCmtblog} />
                                </div>
                                <div className="sale_right_top">
                                    <div className="form">
                                        <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                            onChange={(e) => setShareBlogFix(e.target.value)}
                                            defaultValue={props.ShareBlog}
                                            style={{ borderColor: colorShareblog }}
                                            onBlur={() => validateShareBlog(ShareBlogFix)}
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
                </div>
            </DialogContent>
            <DialogActions className="btn-dialog">
                <Button variant="outlined" className="btn_add_cancel" onClick={handleCloseHuy}>Hủy</Button>
                <Button variant="outlined" className="btn_add_cancel" color="primary" onClick={btnUpdate_Blog}>
                    Sửa
                </Button>
            </DialogActions>
        </Dialog>
    )
}