
import { useEffect, useState } from 'react';
import { sentenceCaseTransform } from 'change-case';

// material
import {
    Button,
    Checkbox,
    TableRow,
    TableCell,
    Typography,

} from '@mui/material';
// avatar
// components

import axios from "axios";
import Moment from 'moment';

import ChiTietDonHang from '../dialog/ChiTietDonHang';
import DonHangMoreMenu from '../sections/@dashboard/user/DonHangMoreMenu';

import '../Item/ItemDHChiTiet';

export default function ItemDonHang(props) {

    const ip = "http://localhost:8080"

    const [color, setColor] = useState("");
    const [background, setBackground] = useState("");

    useEffect(() => {
        if (props.TrangThaiDH == "Chờ xác nhận") {
            setColor("rgb(183, 33, 54)")
            setBackground("rgba(255, 72, 66, 0.16)")
        } else if (props.TrangThaiDH == "Đã xác nhận") {
            setColor("#031b88")
            setBackground("#aab6fb")
        } else if (props.TrangThaiDH == "Đang giao hàng") {
            setColor("#29788a")
            setBackground("#a5cad2")
        } else if (props.TrangThaiDH == "Đã tới kho hàng") {
            setColor("#9e825e")
            setBackground("#ecd59f")
        } else if (props.TrangThaiDH == "Giao hàng thành công") {
            setColor("rgb(34, 154, 22)")
            setBackground("rgba(84, 214, 44, 0.16)")
        }
    },)



    // dialog chi tiet
    const [openCT, setOpenCT] = useState(false);
    const handleClickItemChiTiet = () => {
        setOpenCT(true)
    }



    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        props.setSelected(newSelected);
    };


    let selected = props.selected

    // format date
    const formatDate = Moment(props.DateDH).format('DD/MM/yyyy')

    // format Money
    let SumMoney = new Intl.NumberFormat("it-IT").format(props.SumMoney);

    return (
        <>
            <ChiTietDonHang
                open={openCT}
                setOpen={setOpenCT}
                DsSP={props.DsSP}
            />
            <TableRow
                hover
                key={props._id}
                tabIndex={-1}
                role="checkbox"
                selected={props.isItemSelected}
                aria-checked={props.isItemSelected}
            >
                <TableCell padding="checkbox">
                    <Checkbox checked={props.isItemSelected} onChange={(event) => handleClick(event, props._id)} />
                </TableCell>
                {/* --------------- tên  ----------------- */}
                <TableCell className='name_dh' component="th" scope="row" padding="none" >
                    <Typography align='left' variant="subtitle2"  >
                        {props.NameDH}
                    </Typography>
                </TableCell>
                {/* --------------- SDT và email ----------------- */}
                <TableCell className='email_sdt'>
                    <Typography align='left' variant="subtitle2"  >
                        {props.PhoneDH}
                    </Typography>
                    <Typography align='left' variant="subtitle2" >
                        {props.EmailDH}
                    </Typography>
                    <Typography align='left' variant="subtitle2" >
                        {props.AddreeDH}
                    </Typography>
                </TableCell>
                {/* --------------- Ngày & Địa chỉ----------------- */}
                {/* <TableCell className='address' component="th" scope="row" padding="none" >
                    <Typography align='left' variant="subtitle2" >
                        {props.AddreeDH}
                    </Typography>
                </TableCell> */}
                {/* --------------- PhuongThucTT----------------- */}
                <TableCell className='phuong_thuc_tt' component="th" scope="row" >
                    <Typography align='left' variant="subtitle2" >
                        {props.PhuongThucTT}
                    </Typography>
                </TableCell>
                {/* --------------- ngày đơn hàng----------------- */}
                <TableCell className='date_dh' component="th" scope="row">
                    <Typography align='left' variant="subtitle2" >
                        {formatDate}
                    </Typography>
                </TableCell>
                {/* --------------- tổng tiền----------------- */}
                <TableCell className='tong_tien' component="th" scope="row" >
                    <Typography align='left' variant="subtitle2" >
                        {SumMoney}
                    </Typography>
                </TableCell>

                {/* --------------- trạng thái----------------- */}
                <TableCell className='trang_thai_dh' component="th" scope="row" padding="none" >
                    <Typography className='trang_thai_dh_2' align='center' style={{ background: background, color: color }} variant="subtitle2"  >
                        {props.TrangThaiDH}
                    </Typography>
                </TableCell>
                {/* --------------- loại & chi tiết sản phẩm ----------------- */}
                <TableCell className='xemthem_dh' padding="none" >
                    <Typography align='left' variant="subtitle2" >
                        <Button className='btn_xemThem_dh' variant="outlined" onClick={() => handleClickItemChiTiet()}> Xem thêm</Button>
                    </Typography>
                </TableCell>


                {/* ---------------------------------------------- */}
                <TableCell align="center" padding="none" >
                    <DonHangMoreMenu
                        key={props._id}
                        _id={props._id}
                        idUser={props.idUser}
                        DsSP={props.DsSP}
                        NameDH={props.NameDH}
                        PhoneDH={props.PhoneDH}
                        EmailDH={props.EmailDH}
                        AddreeDH={props.AddreeDH}
                        PhuongThucTT={props.PhuongThucTT}
                        SumMoney={props.SumMoney}
                        DateDH={props.DateDH}
                        TrangThaiDH={props.TrangThaiDH}
                        danhsachSP={props.danhsachSP}
                        setdanhsachSP={props.setdanhsachSP}
                        isItemSelected={props.isItemSelected}
                        selected={props.selected}
                        setSelected={props.setSelected}
                        ShowBtn={props.ShowBtn}
                        setShowBtn={props.setShowBtn}
                    />
                </TableCell>
            </TableRow>

        </>

    )
}