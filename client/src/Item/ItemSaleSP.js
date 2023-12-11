
import { useEffect, useState } from 'react';


// material
import {
    Checkbox,
    TableRow,
    TableCell,
    Typography,

} from '@mui/material';
// avatar
import Avatar from '@mui/material/Avatar';
// components

import axios from "axios";
import SaleSPMoreMenu from '../sections/@dashboard/user/SaleSPMoreMenu';


export default function ItemSaleSP(props) {

    const ip = "http://localhost:8080"

    const [color, setColor] = useState("");
    const [background, setBackground] = useState("");

    useEffect(() => {
        if (props.TrangThaiSale == "Hoạt động") {
            setColor("rgb(34, 154, 22)")
            setBackground("rgba(84, 214, 44, 0.16)")
        } else if (props.TrangThaiSale == "Không hoạt động") {
            setColor("rgb(183, 33, 54)")
            setBackground("rgba(255, 72, 66, 0.16)")
        }
    },)


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

    //  format ngay tao

    var formatTao = new Date(props.NgayTaoSale);

    var dayTao = formatTao.getDate();
    var monthTao = formatTao.getMonth() + 1;
    var yearTao = formatTao.getFullYear();

    var dateTao = dayTao + "/" + monthTao + "/" + yearTao;

    //  format ngay end

    var formatEnd = new Date(props.NgayEndSale);

    var dayEnd = formatEnd.getDate();
    var monthEnd = formatEnd.getMonth() + 1;
    var yearEnd = formatEnd.getFullYear();
    var dateEnd = dayEnd + "/" + monthEnd + "/" + yearEnd;

    return (

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
            {/* --------------- tên sản phẩm ----------------- */}
            <TableCell className='name_sp' component="th" scope="row"  >
                {/* <Stack direction="row" alignItems="center" spacing={2}> */}
                {/* <Avatar alt={name} src={avatarUrl} /> */}
                <Typography align='left' variant="subtitle2"  >
                    {props.NameSaleSP}
                </Typography>
            </TableCell>
            {/* --------------- loại & chi tiết sản phẩm ----------------- */}
            <TableCell className='loai_chiTiet' >
                <Typography align='left' variant="subtitle2" >
                    {props.PhanTramGiamGia}%
                </Typography>
            </TableCell>
            {/* --------------- trạng thái----------------- */}
            <TableCell className='trang_thai' component="th" scope="row" >
                <Typography align='left' variant="subtitle2"  >
                    {dateTao}
                </Typography>
            </TableCell>

            <TableCell className='trang_thai' component="th" scope="row" >
                <Typography align='left' variant="subtitle2"  >
                    {dateEnd}
                </Typography>
            </TableCell>

            <TableCell className='trang_thai' component="th" scope="row" >
                <Typography className='trang_thai_2' align='center' style={{ background: background, color: color }} variant="subtitle2"  >
                    {props.TrangThaiSale}
                </Typography>
            </TableCell>

            {/* ---------------------------------------------- */}
            <TableCell align="left" >
                <SaleSPMoreMenu
                    key={props._id}
                    _id={props._id}
                    NameSaleSP={props.NameSaleSP}
                    PhanTramGiamGia={props.PhanTramGiamGia}
                    NgayTaoSale={props.NgayTaoSale}
                    NgayEndSale={props.NgayEndSale}
                    TrangThaiSale={props.TrangThaiSale}
                    danhsachSP={props.danhsachSP}
                    setdanhsachSP={props.setdanhsachSP}
                    ShowBtn={props.ShowBtn}
                    setShowBtn={props.setShowBtn}
                />
            </TableCell>
        </TableRow>


    )
}