import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// dialog
import axios from "axios";
import UpdateDonHang from '../../../dialog/UpdateDonHang';

// ----------------------------------------------------------------------

export default function DonHangMoreMenu(props) {

    const ip = "http://localhost:8080"

    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    // dialog Update
    const [openFix, setOpenFix] = useState(false);

    // fix
    const handleClickItemFix = () => {
        setOpenFix(true)
        setIsOpen(false)
    }
    // delete
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
        axios.delete(ip + `/DeleteDonHang/${id}`)
        setIsOpen(false)
        props.setShowBtn("delete")
    }
    return (
        <>
            <UpdateDonHang
                open={openFix}
                setOpen={setOpenFix}
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
