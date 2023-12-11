import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// dialog
import axios from "axios";
import UpdateSaleSP from '../../../dialog/UpdateSaleSP';

// ----------------------------------------------------------------------

export default function SaleSPMoreMenu(props) {

  const ip = "http://localhost:8080"

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // dialog Update
  const [openFix, setOpenFix] = useState(false);
  const handleClickItemFix = () => {
    setOpenFix(true)
    setIsOpen(false)
    // console.log(props._id);
  }
  const handleClickDelete = () => {
    setIsOpen(false)
    const checkdelete = window.confirm(
      "Bạn chắc chắn muốn xóa???"
    )
    if (checkdelete == true) {
      btnDeleteDS(props._id)
    }
  }
  const btnDeleteDS = (id) => {
    axios.delete(ip + `/DeleteSoaiSP/${id}`)
    setIsOpen(false)
    props.setShowBtn("delete")
  }

  return (
    <>
      <UpdateSaleSP
        open={openFix}
        setOpen={setOpenFix}
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
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleClickDelete()} sx={{ color: '#fc7e7ed3' }}>
          <ListItemIcon>
            <Iconify sx={{ color: '#fc7e7ed3' }} icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Xóa" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={() => handleClickItemFix()} component={RouterLink} to="#" sx={{ color: '#2065d1' }}>
          <ListItemIcon>
            <Iconify sx={{ color: '#2065d1' }} icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Sửa" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
