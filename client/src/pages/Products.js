import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Paper,

} from '@mui/material';

//axios
import axios from "axios";
import $ from "jquery";
import Moment from 'moment';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, ProductsListToolbar } from '../sections/@dashboard/user';


// trang
import Add_product from '../dialog/Add_product';
import ItemListSP from '../Item/ItemListSP';
import LoadingSpinnerButton from '../pages/LoadingSpinnerButton';
import ScrollToTop from "../pages/ScrollToTop";


// css
import '../css/add_product.css';
import '../css/dialog.css';

// gọi ảnh
import oke from "../assets/success_add.png"

// loading
import BeatLoader from "react-spinners/BeatLoader";

export default function Products() {


  const ip = "http://localhost:8080"

  const TABLE_HEAD = [
    { id: 'image1', label: '', alignRight: false },
    { id: 'NameSP', label: 'Tên sản phẩm', alignRight: false },
    { id: 'GiaGocSP', label: 'Giá gốc', alignRight: false },
    { id: 'GiaBanSP', label: 'Giá bán', alignRight: false },
    { id: 'SoLuongSP', label: 'Số lượng', alignRight: false },
    { id: 'SaleSP', label: 'Giảm giá', alignRight: false },
    { id: 'TrangThaiSP', label: 'Trạng thái', alignRight: false },
    { id: 'Type&Details', label: '', },
    { id: '' },

  ];

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
      return filter(array, (array) => array.NameSP.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const [loading, setLoading] = useState(false);

  const [danhsachSP, setdanhsachSP] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [dsChx, setDsChx] = useState('all');

  //  array combobox

  const [dsSaleSP, setDsSaleSP] = useState([])
  const [dsLoaiSP, setDsLoaiSP] = useState([])



  const getData = () => {
    axios.get(ip + '/getData')
      .then((response) => {
        setdanhsachSP(response.data);
      })
  }

  const getDataSaleSP = () => {
    axios.get(ip + '/getDataSaleSP')
      .then((response) => {
        setDsSaleSP(response.data);
      })
  }

  const getDataLoaiSP = () => {
    axios.get(ip + '/getDataLoaiSP')
      .then((response) => {
        setDsLoaiSP(response.data);
      })
  }

  useEffect(() => {
    getData();
    getDataSaleSP();
    getDataLoaiSP();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [])

  // dialog add
  const [openAdd, setOpenAdd] = useState(false);
  const handleClickItemAdd = () => {
    setOpenAdd(true)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked == true) {
      const newSelecteds = danhsachSP.map((n) => n.idImg);
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
      getData();
      getDataSaleSP();
      getDataLoaiSP();
      setLoading(true);
      setTimeout(() => {
        getData();
        getDataSaleSP();
        getDataLoaiSP();
        setLoading(false);
      }, 1000);
    } else if (ShowBtn == "delete") {
      WartingAlert();
      setShowBtn("")
      setNameShowBtn("Bạn đã xóa thành công")
      getData();
      getDataSaleSP();
      getDataLoaiSP();
      setLoading(true);
      setTimeout(() => {
        getData();
        getDataSaleSP();
        getDataLoaiSP();
        setLoading(false);
      }, 1000);

    } else if (ShowBtn == "update") {
      WartingAlert();
      setShowBtn("")
      setNameShowBtn("Bạn đã sửa thành công")
      setLoading(true);
      getData();
      getDataSaleSP();
      getDataLoaiSP();
      setTimeout(() => {
        getData();
        getDataSaleSP();
        getDataLoaiSP();
        setLoading(false);
      }, 1000);
    } else if (ShowBtn == "") {

    }
  },)

  const formatHT = Moment(new Date()).format('YYYY-MM-DD')
  return (
    <>
      <ScrollToTop />
      <Add_product
        open={openAdd}
        setOpen={setOpenAdd}
        dsLoaiSP={dsLoaiSP}
        setDsLoaiSP={setDsLoaiSP}
        dsSaleSP={dsSaleSP}
        setDsSaleSP={setDsSaleSP}
        danhsachSP={danhsachSP}
        setdanhsachSP={setdanhsachSP}
        ShowBtn={ShowBtn}
        setShowBtn={setShowBtn}
      />
      <Page title="Dashboard: Products">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Tất cả sản phẩm
              {/* <button onClick={Loading}>loading</button> */}

            </Typography>

            <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleClickItemAdd}>
              Thêm sản phẩm
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
                  <option value="all">Tất cả sản phẩm</option>
                  <option value="end">Sắp hết hàng</option>
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Không hoạt động">Không hoạt động</option>
                </select>
              </div>
              <div className='form_loading'>
                <div className='btn_loading' >
                  <LoadingSpinnerButton title={'Refresh'}
                    loading={loading} onClick={() => {
                      setLoading(true)
                      getData();
                      getDataSaleSP();
                      getDataLoaiSP();
                      setSelected([]);
                      setTimeout(() => {
                        setLoading(false)
                      }, 2000)
                    }}>
                  </LoadingSpinnerButton>
                </div>
              </div>
              <div>

              </div>
            </div>
            <ProductsListToolbar selected={selected} numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
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
                        const isItemSelected = selected.indexOf(val.idImg) !== -1;
                        let suaSaleAuto = 0
                        dsSaleSP.map((vl) => {
                          const formatDate = Moment(vl.NgayEndSale).format('YYYY-MM-DD')
                          if (vl.TrangThaiSale == "Không hoạt động") {
                            if (vl.PhanTramGiamGia == val.SaleSP) {
                              axios.put(ip + `/UpdateSPTheoSale/${val._id}`, {
                                SaleSP: suaSaleAuto,
                              })
                            }
                          } else {
                          }
                          if (formatDate < formatHT) {
                            if (vl.PhanTramGiamGia == val.SaleSP) {
                              axios.put(ip + `/UpdateSPTheoSale/${val._id}`, {
                                SaleSP: suaSaleAuto,
                              })
                            }
                          } else {
                          }
                        })
                        if (dsChx == "all") {
                          return (
                            <ItemListSP
                              key={val._id}
                              _id={val._id}
                              idImg={val.idImg}
                              NameSP={val.NameSP}
                              GiaGocSP={val.GiaGocSP}
                              GiaBanSP={val.GiaBanSP}
                              SoLuongSP={val.SoLuongSP}
                              DateNhapSP={val.DateNhapSP}
                              SaleSP={val.SaleSP}
                              TrangThaiSP={val.TrangThaiSP}
                              LoaiSP={val.LoaiSP}
                              ChiTietSP={val.ChiTietSP}
                              danhsachSP={danhsachSP}
                              setdanhsachSP={setdanhsachSP}
                              isItemSelected={isItemSelected}
                              selected={selected}
                              setSelected={setSelected}
                              dsLoaiSP={dsLoaiSP}
                              setDsLoaiSP={setDsLoaiSP}
                              dsSaleSP={dsSaleSP}
                              setDsSaleSP={setDsSaleSP}
                              ShowBtn={ShowBtn}
                              setShowBtn={setShowBtn}
                            />

                          );
                        } else if (dsChx == "end") {
                          if (val.SoLuongSP < 30) {
                            return (
                              <ItemListSP
                                key={val._id}
                                _id={val._id}
                                idImg={val.idImg}
                                NameSP={val.NameSP}
                                GiaGocSP={val.GiaGocSP}
                                GiaBanSP={val.GiaBanSP}
                                SoLuongSP={val.SoLuongSP}
                                DateNhapSP={val.DateNhapSP}
                                SaleSP={val.SaleSP}
                                TrangThaiSP={val.TrangThaiSP}
                                LoaiSP={val.LoaiSP}
                                ChiTietSP={val.ChiTietSP}
                                danhsachSP={danhsachSP}
                                setdanhsachSP={setdanhsachSP}
                                isItemSelected={isItemSelected}
                                selected={selected}
                                setSelected={setSelected}
                                dsLoaiSP={dsLoaiSP}
                                setDsLoaiSP={setDsLoaiSP}
                                dsSaleSP={dsSaleSP}
                                setDsSaleSP={setDsSaleSP}
                                ShowBtn={ShowBtn}
                                setShowBtn={setShowBtn}
                              />

                            );
                          }
                        } else if (dsChx == "Hoạt động") {
                          if (val.TrangThaiSP == "Hoạt động") {
                            return (
                              <ItemListSP
                                key={val._id}
                                _id={val._id}
                                idImg={val.idImg}
                                NameSP={val.NameSP}
                                GiaGocSP={val.GiaGocSP}
                                GiaBanSP={val.GiaBanSP}
                                SoLuongSP={val.SoLuongSP}
                                DateNhapSP={val.DateNhapSP}
                                SaleSP={val.SaleSP}
                                TrangThaiSP={val.TrangThaiSP}
                                LoaiSP={val.LoaiSP}
                                ChiTietSP={val.ChiTietSP}
                                danhsachSP={danhsachSP}
                                setdanhsachSP={setdanhsachSP}
                                isItemSelected={isItemSelected}
                                selected={selected}
                                setSelected={setSelected}
                                dsLoaiSP={dsLoaiSP}
                                setDsLoaiSP={setDsLoaiSP}
                                dsSaleSP={dsSaleSP}
                                setDsSaleSP={setDsSaleSP}
                                ShowBtn={ShowBtn}
                                setShowBtn={setShowBtn}
                              />

                            );
                          }
                        } else if (dsChx == "Không hoạt động") {
                          if (val.TrangThaiSP == "Không hoạt động") {
                            return (
                              <ItemListSP
                                key={val._id}
                                _id={val._id}
                                idImg={val.idImg}
                                NameSP={val.NameSP}
                                GiaGocSP={val.GiaGocSP}
                                GiaBanSP={val.GiaBanSP}
                                SoLuongSP={val.SoLuongSP}
                                DateNhapSP={val.DateNhapSP}
                                SaleSP={val.SaleSP}
                                TrangThaiSP={val.TrangThaiSP}
                                LoaiSP={val.LoaiSP}
                                ChiTietSP={val.ChiTietSP}
                                danhsachSP={danhsachSP}
                                setdanhsachSP={setdanhsachSP}
                                isItemSelected={isItemSelected}
                                selected={selected}
                                setSelected={setSelected}
                                dsLoaiSP={dsLoaiSP}
                                setDsLoaiSP={setDsLoaiSP}
                                dsSaleSP={dsSaleSP}
                                setDsSaleSP={setDsSaleSP}
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
                            {/* <SearchNotFound searchQuery={filterName} /> */}
                            <Paper
                              sx={{
                                textAlign: 'center',
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                Không tìm thấy
                              </Typography>

                              <Typography variant="body2" align="center">
                                Không tìm thấy kết quả cho &nbsp;
                                <strong>&quot;{filterName}&quot;</strong>.
                                <br /> Hãy thử kiểm tra lỗi chính tả hoặc sử dụng các từ hoàn chỉnh.
                              </Typography>
                            </Paper>
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
