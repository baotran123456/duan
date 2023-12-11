
import { useEffect, useState } from 'react';

// material
import {
    Checkbox,
    TableRow,
    TableCell,
    Typography,
    Button,

} from '@mui/material';

// avatar
import Avatar from '@mui/material/Avatar';

// components
import axios from "axios";
import UpdateBlog from '../dialog/UpdateBlog';
import BlogMoreMenu from '../sections/@dashboard/user/BlogMoreMenu';


export default function ItemBlog(props) {

    const ip = "http://localhost:8080"


    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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

    //  format ngay

    var format = new Date(props.DateBlog);

    var day = format.getDate();
    var month = format.getMonth() + 1;
    var year = format.getFullYear();

    var date = day + "/" + month + "/" + year;

    return (
        <>
            <TableRow
                hover
                key={props._id}
                tabIndex={-1}
                role="checkbox"
                selected={props.isItemSelected}
                aria-checked={props.isItemSelected}
            >
                <TableCell padding="checkbox">
                    <Checkbox checked={props.isItemSelected} onChange={(event) => handleClick(event, props.TenBlog)} />
                </TableCell>
                {/* --------------- Ảnh ----------------- */}
                <TableCell className='image_sp' component="th" scope="row"  >
                    {/* <Avatar style={{ borderRadius: '8px' }} sx={{ minWidth: 100, minHeight: 130 }} variant="square"> */}
                    <img className='img' src={ip + '/uploads/' + props.ImageBlog} alt="login"
                        style={{ borderRadius: '8px' }} sx={{ minWidth: 100, minHeight: 130 }} />
                    {/* </Avatar> */}
                </TableCell>
                {/* --------------- tên sản phẩm ----------------- */}
                <TableCell className='name_blog' component="th" scope="row"  >
                    <Typography align='left' variant="subtitle2" >
                        {props.TenBlog}
                    </Typography>
                </TableCell>
                {/* ---------------------------------------------- */}
                <TableCell className='like_blog' component="th" scope="row"  >
                    <Typography align='left' variant="subtitle2" >
                        {date}
                    </Typography>
                </TableCell>
                {/* ---------------------------------------------- */}
                <TableCell className='like_blog' component="th" scope="row"  >
                    <Typography align='left' variant="subtitle2"  >
                        {props.LikeBlog}
                    </Typography>
                </TableCell>
                <TableCell className='like_blog' component="th" scope="row"  >
                    <Typography align='left' variant="subtitle2" >
                        {props.CmtBlog}
                    </Typography>
                </TableCell>
                <TableCell className='like_blog' component="th" scope="row"  >
                    <Typography align='left' variant="subtitle2" >
                        {props.ShareBlog}
                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <BlogMoreMenu
                        key={props._id}
                        _id={props._id}
                        ImageBlog={props.ImageBlog}
                        DateBlog={props.DateBlog}
                        TenBlog={props.TenBlog}
                        LikeBlog={props.LikeBlog}
                        CmtBlog={props.CmtBlog}
                        ShareBlog={props.ShareBlog}
                        danhsachSP={props.danhsachSP}
                        setdanhsachSP={props.setdanhsachSP}
                        ShowBtn={props.ShowBtn}
                        setShowBtn={props.setShowBtn}
                    />
                </TableCell>
            </TableRow>
        </>

    )
}




