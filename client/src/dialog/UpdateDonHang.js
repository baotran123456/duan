import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
    Button,

} from '@mui/material';
import axios from "axios";
import Moment from 'moment';

export default function UpdateDonHang(props) {

    const ip = "http://localhost:8080"

    const [NameDH, setNameDH] = useState(props.NameDH)
    const [PhoneDH, setPhoneDH] = useState(props.PhoneDH)
    const [EmailDH, setEmailDH] = useState(props.EmailDH)
    const [AddreeDH, setAddreeDH] = useState(props.AddreeDH)
    const [PhuongThucTT, setPhuongThucTT] = useState(props.PhuongThucTT)
    const [SumMoney, setSumMoney] = useState(props.SumMoney)
    const [DateDH, setDateDH] = useState(props.DateDH)
    const [TrangThaiDH, setTrangThaiDH] = useState(props.TrangThaiDH)

    const formatDate = Moment(props.DateDH).format('YYYY-MM-DD')

    const btnUpdate_DonHang = () => {
        axios.put(ip + `/UpdateDonHang/${props._id}`, {
            NameDH: NameDH,
            PhoneDH: PhoneDH,
            EmailDH: EmailDH,
            AddreeDH: AddreeDH,
            DateDH: new Date(),
            TrangThaiDH: TrangThaiDH,
        })
        handleClose();
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
                    <h2 style={{ textAlign: 'center', paddingBottom: '1%', color: '#2065d1' }}>Sửa thông tin đơn hàng</h2>

                    <div className="frames_sale">
                        <div className="sale_left">
                            <div className="sale_left_top">
                                <div className="form">
                                    <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                        onChange={(e) => setNameDH(e.target.value)}
                                        defaultValue={props.NameDH}
                                        required
                                    />
                                    <label className="form__label">Tên</label>
                                </div>
                            </div>
                            <div className="sale_left_top">
                                <div className="form">
                                    <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                        onChange={(e) => setPhoneDH(e.target.value)}
                                        defaultValue={props.PhoneDH}
                                        required
                                    />
                                    <label className="form__label">SDT</label>
                                </div>
                            </div>
                            <div className="sale_left_top">
                                <div className="form">
                                    <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                        onChange={(e) => setEmailDH(e.target.value)}
                                        defaultValue={props.EmailDH}
                                        required
                                    />
                                    <label className="form__label">Email</label>
                                </div>
                            </div>
                            <div className="sale_left_top">
                                <div className="form">
                                    <input type="text" className="form__input" placeholder=" " name="Tên áo"
                                        onChange={(e) => setAddreeDH(e.target.value)}
                                        defaultValue={props.AddreeDH}
                                        required
                                    />
                                    <label className="form__label">Địa chỉ</label>
                                </div>
                            </div>
                            {/* ------------------------------------ không cần update ------------------------------------ */}
                            {/* <div className="no_update">
                                <div className="no_update_tt">
                                    <div className="sale_left_top">
                                        <div className="form">
                                            <input type="text" className="form__input" placeholder=" " name="Tên áo" disabled={true}
                                                onChange={(e) => setPhuongThucTT(e.target.value)}
                                                defaultValue={props.PhuongThucTT}
                                                required
                                            />
                                            <label className="form__label">Phương thức thanh toán</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="no_update_date">
                                    <div className="sale_right_top">
                                        <div className="form_dateGG">
                                            <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update" disabled={true}
                                                defaultValue={formatDate}
                                            />
                                            <label className="form__label">Ngày</label>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="form_trangthai">
                                <select defaultValue={props.TrangThaiDH} onChange={(e) => setTrangThaiDH(e.target.value)}>
                                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                                    <option value="Đã xác nhận">Đã xác nhận</option>
                                    <option value="Đang giao hàng">Đang giao hàng</option>
                                    <option value="Đã tới kho hàng">Đã tới kho hàng</option>
                                    <option value="Giao hàng thành công">Giao hàng thành công</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
            </DialogContent>
            <DialogActions className="btn-dialog-sale">
                <Button variant="outlined" className="btn_add_cancel_sale" onClick={handleCloseHuy}>Hủy</Button>
                <Button variant="outlined" className="btn_add_cancel_sale" color="primary" onClick={btnUpdate_DonHang}>
                    Sửa
                </Button>
            </DialogActions>
        </Dialog>
    )
}