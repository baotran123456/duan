import { useEffect, useState } from "react";
import { sentenceCaseTransform } from "change-case";

// material
import {
  Button,
  Checkbox,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
// avatar
// components
import { ProductMoreMenu } from "../sections/@dashboard/user";

import axios from "axios";

import ChiTietSp from "../dialog/ChiTietSp.js";
import ItemImage from "./ItemImage";

export default function ItemListSP(props) {
  const ip = "http://localhost:8080";

  const [multipleFiles, setMultipleFiles] = useState([]);

  const [color, setColor] = useState("");
  const [background, setBackground] = useState("");
  useEffect(() => {
    axios.get(ip + `/getImg/${props.idImg}`).then((response) => {
      setMultipleFiles(response.data);
    });

    if (props.TrangThaiSP == "Hoạt động") {
      setColor("rgb(34, 154, 22)");
      setBackground("rgba(84, 214, 44, 0.16)");
    } else if (props.TrangThaiSP == "Không hoạt động") {
      setColor("rgb(183, 33, 54)");
      setBackground("rgba(255, 72, 66, 0.16)");
    }
  });

  // dialog chi tiet
  const [openCT, setOpenCT] = useState(false);
  const handleClickItemChiTiet = () => {
    setOpenCT(true);
  };

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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    props.setSelected(newSelected);
  };

  let selected = props.selected;

  return (
    <>
      <ChiTietSp
        open={openCT}
        setOpen={setOpenCT}
        NameSP={props.NameSP}
        GiaGocSP={props.GiaGocSP}
        GiaBanSP={props.GiaBanSP}
        SoLuongSP={props.SoLuongSP}
        DateNhapSP={props.DateNhapSP}
        SaleSP={props.SaleSP}
        TrangThaiSP={props.TrangThaiSP}
        LoaiSP={props.LoaiSP}
        ChiTietSP={props.ChiTietSP}
        multipleFiles={multipleFiles}
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
          <Checkbox
            checked={props.isItemSelected}
            onChange={(event) => handleClick(event, props.idImg)}
          />
        </TableCell>
        {/* --------------- Ảnh ----------------- */}
        <TableCell className="image_sp" component="th" scope="row">
          <Typography>
            {multipleFiles.map((element, index) => {
              return (
                <ItemImage key={index} files={element.files} height={120} />
              );
            })}
          </Typography>
        </TableCell>
        {/* --------------- tên sản phẩm ----------------- */}
        <TableCell className="name_sp" component="th" scope="row">
          {/* <Stack direction="row" alignItems="center" spacing={2}> */}
          {/* <Avatar alt={name} src={avatarUrl} /> */}
          <Typography align="left" variant="subtitle2">
            {props.NameSP}
          </Typography>
        </TableCell>
        {/* --------------- giá gốc & giá bán sản phẩm ----------------- */}
        <TableCell className="giaGoc_giaBan">
          <Typography align="left" variant="subtitle2">
            {props.GiaGocSP}VND
          </Typography>
        </TableCell>
        <TableCell className="giaGoc_giaBan">
          <Typography align="left" variant="subtitle2">
            {props.GiaBanSP}VND
          </Typography>
        </TableCell>
        {/* --------------- số lượng ----------------- */}
        <TableCell className="so_luong" component="th" scope="row">
          <Typography align="left" variant="subtitle2">
            {props.SoLuongSP}
          </Typography>
        </TableCell>
        {/* --------------- giảm giá sale----------------- */}
        <TableCell className="giam_gia" component="th" scope="row">
          <Typography align="left" variant="subtitle2">
            {props.SaleSP}%
          </Typography>
        </TableCell>
        {/* ---------------  ngày nhập----------------- */}

        {/* --------------- trạng thái----------------- */}
        <TableCell className="trang_thai" component="th" scope="row">
          <Typography
            className="trang_thai_2"
            align="center"
            style={{ background: background, color: color }}
            variant="subtitle2"
          >
            {props.TrangThaiSP}
          </Typography>
        </TableCell>
        {/* --------------- loại & chi tiết sản phẩm ----------------- */}
        <TableCell className="loai_chiTiet" padding="none">
          <Typography align="left" variant="subtitle2">
            <Button
              className="btn_xemThem"
              variant="outlined"
              onClick={() => handleClickItemChiTiet()}
            >
              {" "}
              Xem thêm
            </Button>
          </Typography>
        </TableCell>

        {/* ---------------------------------------------- */}
        <TableCell align="center" padding="none">
          <ProductMoreMenu
            key={props._id}
            _id={props._id}
            idImg={props.idImg}
            NameSP={props.NameSP}
            GiaGocSP={props.GiaGocSP}
            GiaBanSP={props.GiaBanSP}
            SoLuongSP={props.SoLuongSP}
            DateNhapSP={props.DateNhapSP}
            SaleSP={props.SaleSP}
            TrangThaiSP={props.TrangThaiSP}
            LoaiSP={props.LoaiSP}
            ChiTietSP={props.ChiTietSP}
            danhsachSP={props.danhsachSP}
            setdanhsachSP={props.setdanhsachSP}
            multipleFiles={multipleFiles}
            dsLoaiSP={props.dsLoaiSP}
            setDsLoaiSP={props.setDsLoaiSP}
            dsSaleSP={props.dsSaleSP}
            setDsSaleSP={props.setDsSaleSP}
            ShowBtn={props.ShowBtn}
            setShowBtn={props.setShowBtn}
          />
        </TableCell>
      </TableRow>
    </>
  );
}
