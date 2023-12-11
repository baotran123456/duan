import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
    Button,

} from '@mui/material';
import axios from "axios";

export default function UpdateLoaiSP(props) {

    const ip = "http://localhost:8080"

    const [TKUserFix, setTKUserFix] = useState(props.TKUser)
    const [EmailUserFix, setEmailUserFix] = useState(props.EmailUser)
    const [TrangThaiUserFix, setTrangThaiUserFix] = useState(props.TrangThaiLoaiSP)


    // Tài khoản User
    const [colorTKUser, setColorTKUser] = useState("#d8dde1");
    const [tkuserCheck, setTKUserCheck] = useState(true);
    const [errorTKUser, setErrorTKUser] = useState("");
    const [chxBtnTKUser, setChxBtnTKUser] = useState();
    const validateTKUser = (sa) => {
        if (sa != null) {
            setTKUserCheck(true);
            setColorTKUser("#d8dde1");
            setErrorTKUser("");
            setChxBtnTKUser(true)
        }
        if (sa == null) {
            setTKUserCheck(false);
            setColorTKUser("red");
            setErrorTKUser("Tài khoản user không được để trống");
            setChxBtnTKUser(false)
        }

    }
    function ErrorTKUser(props) {
        if (props.isHidden) { return null; }
        return (
            <div className="form_warning">
                {props.ErrorTKUser}
            </div>
        )
    }

    // Email User
    const [colorEmailUser, setColorEmailUser] = useState("#d8dde1");
    const [emailuserCheck, setEmailUserCheck] = useState(true);
    const [errorEmailUser, setErrorEmailUser] = useState("");
    const [chxBtnEmailUser, setChxBtnEmailUser] = useState();
    const validateEmailUser = (sa) => {
        if (sa != null) {
            setEmailUserCheck(true);
            setColorEmailUser("#d8dde1");
            setErrorEmailUser("");
            setChxBtnEmailUser(true)
        }
        if (sa == null) {
            setEmailUserCheck(false);
            setColorEmailUser("red");
            setErrorEmailUser("Email user không được để trống");
            setChxBtnEmailUser(false)
        }

    }
    function ErrorEmailUser(props) {
        if (props.isHidden) { return null; }
        return (
            <div className="form_warning">
                {props.ErrorEmailUser}
            </div>
        )
    }

    useEffect(() => {
        validateTKUser(TKUserFix);
        validateEmailUser(EmailUserFix);
        if (props.open == false) {
            // check validate về ẩn
            setTKUserCheck(true)
            setEmailUserCheck(true)

            // setColor về mặc định
            setColorTKUser("#d8dde1")
            setColorEmailUser("#d8dde1")

            // setButton add ve rong
            setChxBtnTKUser()
            setChxBtnEmailUser()
        }
    })

    const btnUpdate_User = () => {
        // console.log(chxBtnTKUser, chxBtnEmailUser);
        if (TKUserFix == props.TKUser && chxBtnTKUser == null &&
            EmailUserFix == props.EmailUser && chxBtnEmailUser == null) {
            validateTKUser(TKUserFix);
            validateEmailUser(EmailUserFix)
        } else
            if (chxBtnTKUser == true) {
                axios.put(ip + `/UpdateUser/${props._id}`, {
                    NameUser: TKUserFix,
                    EmailUser: EmailUserFix,
                    TrangThaiUser: TrangThaiUserFix,
                })
                handleClose();
            }
    }
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
            maxWidth="sm"
        >
            <DialogContent>
                <div className="container-up" >
                    <h2 style={{ textAlign: 'center', paddingBottom: '20px', color: '#2065d1' }}>Sửa thông tin User</h2>

                    <div className="frames_sale">
                        <div className="sale_left">
                            <div className="sale_left_top">
                                <div className="form">
                                    <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                        onChange={(e) => setTKUserFix(e.target.value)}
                                        disabled={true}
                                        defaultValue={props.TKUser}
                                        style={{ borderColor: colorTKUser }}
                                        onBlur={() => validateTKUser(TKUserFix)}
                                        required
                                    />
                                    <label className="form__label">Tài Khoản</label>
                                </div>
                                <ErrorTKUser
                                    isHidden={tkuserCheck}
                                    ErrorTKUser={errorTKUser} />
                            </div>

                            <div className="sale_left_top">
                                <div className="form">
                                    <input type="text" className="form__input" name="Tên áo" disabled={true}
                                        onChange={(e) => setEmailUserFix(e.target.value)}
                                        defaultValue={props.passUser}
                                    />
                                    <label className="form__label">Mật khẩu</label>
                                </div>
                            </div>
                            <div className="sale_left_top">
                                <div className="form">
                                    <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                        onChange={(e) => setEmailUserFix(e.target.value)}
                                        disabled={true}
                                        defaultValue={props.EmailUser}
                                        style={{ borderColor: colorEmailUser }}
                                        onBlur={() => validateEmailUser(EmailUserFix)}
                                        required
                                    />
                                    <label className="form__label">Email</label>
                                </div>
                                <ErrorEmailUser
                                    isHidden={emailuserCheck}
                                    ErrorEmailUser={errorEmailUser} />
                            </div>

                            <div className="form_trangthai">
                                <select defaultValue={props.TrangThaiUser}
                                    onChange={(e) => setTrangThaiUserFix(e.target.value)}>
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
                <Button variant="outlined" className="btn_add_cancel_sale" color="primary" onClick={btnUpdate_User}>
                    Sửa
                </Button>
            </DialogActions>
        </Dialog>
    )
}