
import { useEffect, useState } from 'react';
import Moment from 'moment';

// material
import {
    Button,
    Checkbox,
    TableRow,
    TableCell,
    Typography,

} from '@mui/material';
// avatar
import Avatar from '@mui/material/Avatar';
// components


import axios from "axios";
import { PhanHoiMoreMenu } from '../sections/@dashboard/user';


export default function ItemPhanHoi(props) {

    const ip = "http://localhost:8080"

    const [color, setColor] = useState("");


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

    const formatDate = Moment(props.Date).format('DD/MM/YYYY')

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
                    {props.Name}
                </Typography>
            </TableCell>
            {/* --------------- mô tả sản phẩm ----------------- */}
            <TableCell className='loai_chiTiet' >
                <Typography align='left' variant="subtitle2" >
                    {props.Email}
                </Typography>
            </TableCell>
            {/* --------------- SDT----------------- */}
            <TableCell className='name_user' component="th" scope="row" >
                <Typography className='trang_thai_2' align='left' style={{ background: color, }} variant="subtitle2"  >
                    {props.SDT}
                </Typography>
            </TableCell>
            {/* --------------- date----------------- */}
            <TableCell className='name_user' component="th" scope="row" >
                <Typography className='trang_thai_2' align='left' style={{ background: color, }} variant="subtitle2"  >
                    {formatDate}
                </Typography>
            </TableCell>
            {/* --------------- Dia Chi----------------- */}
            <TableCell className='trang_thai' component="th" scope="row" >
                <Typography className='trang_thai_2' align='left' style={{ background: color, }} variant="subtitle2"  >
                    {props.DiaChi}
                </Typography>
            </TableCell>
            {/* --------------- Mota----------------- */}
            <TableCell className='trang_thai' component="th" scope="row" >
                <Typography className='trang_thai_2' align='left' style={{ background: color, }} variant="subtitle2"  >
                    {props.Mota}
                </Typography>
            </TableCell>

            {/* ---------------------------------------------- */}
            <TableCell align="right">
                <PhanHoiMoreMenu
                    key={props._id}
                    _id={props._id}
                    ShowBtn={props.ShowBtn}
                    setShowBtn={props.setShowBtn}
                />
            </TableCell>
        </TableRow>


    )
}