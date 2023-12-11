
import { useEffect, useState } from 'react';


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
import avt from '../assets/avt.png';

// components
import axios from "axios";
import { UserMoreMenu } from '../sections/@dashboard/user';



export default function ItemUser(props) {

    const ip = "http://localhost:8080"

    const [color, setColor] = useState("");
    const [background, setBackground] = useState("");

    useEffect(() => {
        if (props.TrangThaiUser == "Hoạt động") {
            setColor("rgb(34, 154, 22)")
            setBackground("rgba(84, 214, 44, 0.16)")
        } else if (props.TrangThaiUser == "Không hoạt động") {
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
            {/* --------------- Ảnh ----------------- */}
            <TableCell className='image_sp' component="th" scope="row">
                {/* <Avatar style={{ borderRadius: '50%' }} sx={{ minWidth: 80, minHeight: 80 }} variant="square"> */}
                <img className='img' src={avt} alt="login" width={'100%'} />
                {/* </Avatar> */}
            </TableCell>
            {/* --------------- tên TK ----------------- */}
            <TableCell className='trangthai_user' component="th" scope="row"  >
                {/* <Stack direction="row" alignItems="center" spacing={2}> */}
                {/* <Avatar alt={name} src={avatarUrl} /> */}
                <Typography align='left' variant="subtitle2"  >
                    {props.TKUser}
                </Typography>
            </TableCell>
            {/* --------------- Email ----------------- */}
            <TableCell className='name_user' >
                <Typography align='left' variant="subtitle2" >
                    {props.EmailUser}
                </Typography>
            </TableCell>
            {/* --------------- Pass ----------------- */}
            <TableCell className='name_user' style={{ width: "5%" }}>
                <Typography align='left' variant="subtitle2" >
                    {props.passUser.substring(0, 25)}
                </Typography>
            </TableCell>
            {/* --------------- trạng thái----------------- */}
            <TableCell className='trangthai' component="th" scope="row" >
                <Typography className='trang_thai_2' align='center'
                    style={{ background: background, color: color, padding: "5px" }} variant="subtitle2" >
                    {props.TrangThaiUser}
                </Typography>
            </TableCell>


            {/* ---------------------------------------------- */}
            <TableCell align="right">
                <UserMoreMenu
                    key={props._id}
                    _id={props._id}
                    TKUser={props.TKUser}
                    EmailUser={props.EmailUser}
                    passUser={props.passUser}
                    TrangThaiUser={props.TrangThaiUser}
                    danhsachSP={props.danhsachSP}
                    setdanhsachSP={props.setdanhsachSP}
                    ShowBtn={props.ShowBtn}
                    setShowBtn={props.setShowBtn}
                />
            </TableCell>
        </TableRow>


    )
}