
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,

} from '@mui/material';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, SaleListToolbar } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';

import axios from "axios";
import $ from "jquery";

// gọi trang
import Add_SaleSP from '../dialog/Add_SaleSP';
import ItemSaleSP from '../Item/ItemSaleSP';
import LoadingSpinnerButton from '../pages/LoadingSpinnerButton';
import ScrollToTop from "../pages/ScrollToTop";

// css
import '../css/add_product.css';
import '../css/dialog.css';

// gọi ảnh
import oke from "../assets/success_add.png"

// loading
import BeatLoader from "react-spinners/BeatLoader";

// ----------------------------------------------------------------------
export default function SaleSP() {

  const TABLE_HEAD = [
    { id: 'name', label: 'Tên giảm giá', alignRight: false },
    { id: 'PhanTramGiamGia', label: 'Giảm giá (%)', alignRight: false },
    { id: 'NgayTaoSale', label: 'Ngày Tạo', alignRight: false },
    { id: 'NgayEndSale', label: 'Ngày kết thúc', alignRight: false },
    { id: 'TrangThaiSale', label: 'Trạng Thái', alignRight: false },
    { id: '' },

  ];

  const ip = "http://localhost:8080"

  const [loading, setLoading] = useState(false);

  const [danhsachSP, setdanhsachSP] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  // seletion all
  const [dsChx, setDsChx] = useState('all');

  // ----------------------------------------------------------------------

  function descendingComparator(a, b, orderBy) {

    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(array, (array) => array.NameSaleSP.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }

  useEffect(() => {
    getDataSaleSP();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [])

  const getDataSaleSP = () => {
    axios.get(ip + '/getDataSaleSP')
      .then((response) => {
        setdanhsachSP(response.data);
      })
  }

  // dialog
  const [open, setOpen] = useState(false);
  const handleClickItem = () => {
    setOpen(true)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked == true) {
      const newSelecteds = danhsachSP.map((n) => n._id);
      setSelected(newSelecteds);
    }
    if (event.target.checked == false) {
      setSelected([]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - danhsachSP.length) : 0;

  const filteredUsers = applySortFilter(danhsachSP, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  const [ShowBtn, setShowBtn] = useState()
  const [NameShowBtn, setNameShowBtn] = useState()
  const WartingAlert = () => {
    $(".add_them").ready(function () {
      $(".alert").addClass("show");
      $(".alert").removeClass("hide");
      $(".alert").addClass("showAlert");
      setTimeout(function () {
        $(".alert").removeClass("show");
        $(".alert").addClass("hide");
      }, 3000);
    });
    $(".btn_alert").click(function () {
      $(".alert").removeClass("show");
      $(".alert").addClass("hide");
    });
  }
  useEffect(() => {
    if (ShowBtn == "add") {
      WartingAlert();
      setShowBtn("")
      setNameShowBtn("Bạn đã thêm thành công")
      getDataSaleSP();
      setLoading(true);
      setTimeout(() => {
        getDataSaleSP();
        setLoading(false);
      }, 1000);
    } else if (ShowBtn == "delete") {
      WartingAlert();
      setShowBtn("")
      setNameShowBtn("Bạn đã xóa thành công")
      getDataSaleSP();
      setLoading(true);
      setTimeout(() => {
        getDataSaleSP();
        setLoading(false);
      }, 1000);
    } else if (ShowBtn == "update") {
      WartingAlert();
      setShowBtn("")
      setNameShowBtn("Bạn đã sửa thành công")
      setLoading(true);
      getDataSaleSP();
      setTimeout(() => {
        getDataSaleSP();
        setLoading(false);
      }, 1000);
    } else if (ShowBtn == "") {

    }
  },)
  return (
    <>
      <ScrollToTop />
      <Add_SaleSP
        open={open}
        setOpen={setOpen}
        ShowBtn={ShowBtn}
        setShowBtn={setShowBtn}
      />
      <Page title="Dashboard: SaleSP">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Mã Giảm Giá Sản Phẩm
            </Typography>
            <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleClickItem}>
              Thêm Mã Giảm Giá
            </Button>
          </Stack>
          <Card>
            <div>
              <div className="alert hide">
                <img src={oke} width='28' height='28' />
                <p className="msg">{NameShowBtn}</p>
                <div className="btn_alert_add">
                  x
                </div>
              </div>
            </div>
            <div className='form_product_top'>
              <div className="select">
                <select defaultValue={dsChx} onChange={(e) => setDsChx(e.target.value)}>
                  <option value="all">Tất cả mã giảm giá</option>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Không hoạt động">Không hoạt động</option>
                </select>
              </div>
              <div className='form_loading'>
                <div className='btn_loading' >
                  <LoadingSpinnerButton title={'Refresh'}
                    loading={loading} onClick={() => {
                      setLoading(true)
                      setSelected([]);
                      getDataSaleSP();
                      setTimeout(() => {
                        setLoading(false)
                      }, 2000)
                    }}>
                  </LoadingSpinnerButton>
                </div>
              </div>
            </div>
            <SaleListToolbar selected={selected} numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                {loading ? (
                  <div className="loading">
                    <BeatLoader
                      color={"#2065d1"}
                      loading={loading}
                      size={15}
                      margin={5}
                      speedMultiplier={1}
                    />
                  </div>
                ) : (
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={danhsachSP.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody >
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val) => {
                        const isItemSelected = selected.indexOf(val._id) !== -1;
                        if (dsChx == "all") {
                          return (
                            <ItemSaleSP
                              key={val._id}
                              _id={val._id}
                              NameSaleSP={val.NameSaleSP}
                              PhanTramGiamGia={val.PhanTramGiamGia}
                              NgayTaoSale={val.NgayTaoSale}
                              NgayEndSale={val.NgayEndSale}
                              TrangThaiSale={val.TrangThaiSale}
                              danhsachSP={danhsachSP}
                              setdanhsachSP={setdanhsachSP}
                              isItemSelected={isItemSelected}
                              selected={selected}
                              setSelected={setSelected}
                              ShowBtn={ShowBtn}
                              setShowBtn={setShowBtn}
                            />
                          );
                        } else if (dsChx == "Hoạt động") {
                          if (val.TrangThaiSale == "Hoạt động") {
                            return (
                              <ItemSaleSP
                                key={val._id}
                                _id={val._id}
                                NameSaleSP={val.NameSaleSP}
                                PhanTramGiamGia={val.PhanTramGiamGia}
                                NgayTaoSale={val.NgayTaoSale}
                                NgayEndSale={val.NgayEndSale}
                                TrangThaiSale={val.TrangThaiSale}
                                danhsachSP={danhsachSP}
                                setdanhsachSP={setdanhsachSP}
                                isItemSelected={isItemSelected}
                                selected={selected}
                                setSelected={setSelected}
                                ShowBtn={ShowBtn}
                                setShowBtn={setShowBtn}
                              />
                            );
                          }
                        } else if (dsChx == "Không hoạt động") {
                          if (val.TrangThaiSale == "Không hoạt động") {
                            return (
                              <ItemSaleSP
                                key={val._id}
                                _id={val._id}
                                NameSaleSP={val.NameSaleSP}
                                PhanTramGiamGia={val.PhanTramGiamGia}
                                NgayTaoSale={val.NgayTaoSale}
                                NgayEndSale={val.NgayEndSale}
                                TrangThaiSale={val.TrangThaiSale}
                                danhsachSP={danhsachSP}
                                setdanhsachSP={setdanhsachSP}
                                isItemSelected={isItemSelected}
                                selected={selected}
                                setSelected={setSelected}
                                ShowBtn={ShowBtn}
                                setShowBtn={setShowBtn}
                              />
                            );
                          }
                        }
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                )}
              </TableContainer>
            </Scrollbar>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={danhsachSP.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page >
    </>
  );
}
