
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
  Alert,

} from '@mui/material';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';

import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, DoanhThuListToolbar } from '../sections/@dashboard/user';

import axios from "axios";

// gọi trang
import LoadingSpinnerButton from '../pages/LoadingSpinnerButton';
import ScrollToTop from "../pages/ScrollToTop";
import ItemDoanhThu from '../Item/ItemDoanhThu';
import Iconify from '../components/Iconify';


// css
import '../css/add_product.css';
import '../css/dialog.css';

// loading
import BeatLoader from "react-spinners/BeatLoader";

import Moment from 'moment';
import DemoExcel from '../dialog/DemoExcel';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';



// ----------------------------------------------------------------------
export default function DoanhThu() {

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

  const TABLE_HEAD = [
    { id: 'NameDH', label: 'Mã đơn hàng', alignRight: false },
    { id: 'PhoneDH', label: 'Thông tin cá nhân', alignRight: false, },
    // { id: 'EmailDH', label: 'EmailDH', alignRight: false },
    // { id: 'AddreeDH', label: 'AddreeDH', alignRight: false },
    { id: 'PhuongThucTT', label: 'Phương thức TT', alignRight: false },
    { id: 'DateDH', label: 'Ngày', alignRight: false },
    { id: 'SumMoney', label: 'Tổng tiền (VND)', alignRight: false },
    { id: 'TrangThaiDH', label: 'Trạng Thái', alignRight: false },

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
      return filter(array, (array) => array.NameDH.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }

  let TrangThaiDH = "Giao hàng thành công"
  const getDonHangAdmin = () => {
    axios.get(ip + `/getDonHangAdmin/${TrangThaiDH}`)
      .then((response) => {
        setdanhsachSP(response.data);
      })
  }


  useEffect(() => {
    getDonHangAdmin();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [])


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

  // dialog
  const [open, setOpen] = useState(false);
  const handleClickItem = () => {
    setOpen(true)
  }

  const [max, setMax] = useState("")
  const [min, setMin] = useState("")

  const [NgayStart, setNgayStart] = useState()
  const [NgayEnd, setNgayEnd] = useState()

  const formatDateStart = Moment(NgayStart).format('YYYY-MM-DD')

  const formatDateEnd = Moment(NgayEnd).format('YYYY-MM-DD')

  // ngay Start
  const [colorDateStart, setColorDateStart] = useState("#d8dde1");
  const [dateStartCheck, setDateStartCheck] = useState(true);
  const [errorDateStart, setErrorDateStart] = useState("");
  const [, setChxBtnDateStart] = useState();
  const validateDateStart = (se) => {
    if (se != null) {
      setMin(se)
      setDateStartCheck(true)
      setColorDateStart("#d8dde1")
      setErrorDateStart("")
      setChxBtnDateStart(true)
    }
    if (se == null) {
      setDateStartCheck(false)
      setColorDateStart("red")
      setErrorDateStart("Chưa nhập ngày tạo giảm giá")
      setChxBtnDateStart(false)
    }

  }
  // function ErrorDateStart(props) {
  //   if (props.isHidden) { return null; }
  //   return (
  //     <div className="form_warning">
  //       {props.ErrorDateStart}
  //     </div>
  //   )
  // }

  // ngay End
  const [colorDateEnd, setColorDateEnd] = useState("#d8dde1");
  const [dateEndCheck, setDateEndCheck] = useState(true);
  const [errorDateEnd, setErrorDateEnd] = useState("");
  const [chxBtnDateEnd, setChxBtnDateEnd] = useState();
  const validateDateEnd = (se) => {
    if (se != null) {
      setMax(se)
      setDateEndCheck(true)
      setColorDateEnd("#d8dde1")
      setErrorDateEnd("")
      setChxBtnDateEnd(true)
    }
    if (se == null) {
      setDateEndCheck(false)
      setColorDateEnd("red")
      setChxBtnDateEnd(false)
      setErrorDateEnd("Chưa nhập ngày kết thúc giảm giá")
    }
  }

  const [dsYear, setDsYear] = useState([]);
  const [layYear, setYear] = useState(2022);
  const [allT1, setAllT1] = useState();
  const [allT2, setAllT2] = useState();
  const [allT3, setAllT3] = useState();
  const [allT4, setAllT4] = useState();
  const [allT5, setAllT5] = useState();
  const [allT6, setAllT6] = useState();
  const [allT7, setAllT7] = useState();
  const [allT8, setAllT8] = useState();
  const [allT9, setAllT9] = useState();
  const [allT10, setAllT10] = useState();
  const [allT11, setAllT11] = useState();
  const [allT12, setAllT12] = useState();

  useEffect(() => {
    let Year = []
    let startYear = 2000;
    let endYear = new Date().getFullYear();
    for (let i = endYear; i > startYear; i--) {
      Year.push(i)
      setDsYear(Year)
    }
    let TinhTien = 0;
    danhsachSP.map((vl, index) => {
      const locTheoNam = Moment(vl.DateDH).format('YYYY')
      const locTheoThang = Moment(vl.DateDH).format('MM')
      if (locTheoNam == layYear) {
        if (locTheoThang == "01") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT1(TinhTien)
        }
        if (locTheoThang == "02") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT2(TinhTien)
        }

        if (locTheoThang == "03") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT3(TinhTien)
        }
        if (locTheoThang == "04") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT4(TinhTien)
        }
        if (locTheoThang == "05") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT5(TinhTien)
        }
        if (locTheoThang == "06") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT6(TinhTien)
        }
        if (locTheoThang == "07") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT7(TinhTien)
        }
        if (locTheoThang == "08") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT8(TinhTien)
        }
        if (locTheoThang == "09") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT9(TinhTien)
        }
        if (locTheoThang == "10") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT10(TinhTien)
        }
        if (locTheoThang == "11") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT11(TinhTien)
        }
        if (locTheoThang == "12") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT12(TinhTien)
        }
      } else {
        setAllT1(0)
        setAllT2(0)
        setAllT3(0)
        setAllT4(0)
        setAllT5(0)
        setAllT6(0)
        setAllT7(0)
        setAllT8(0)
        setAllT9(0)
        setAllT10(0)
        setAllT11(0)
        setAllT12(0)
      }
    })
  }, [])

  const onClickRsChart = () => {
    let Year = []
    let startYear = 2000;
    let endYear = new Date().getFullYear();
    for (let i = endYear; i > startYear; i--) {
      Year.push(i)
      setDsYear(Year)
    }
    let TinhTien = 0;

    danhsachSP.map((vl, index) => {
      const locTheoNam = Moment(vl.DateDH).format('YYYY')
      const locTheoThang = Moment(vl.DateDH).format('MM')
      if (locTheoNam == layYear) {
        if (locTheoThang == "01") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT1(TinhTien)
        }
        if (locTheoThang == "02") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT2(TinhTien)
        }

        if (locTheoThang == "03") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT3(TinhTien)
        }
        if (locTheoThang == "04") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT4(TinhTien)
        }
        if (locTheoThang == "05") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT5(TinhTien)
        }
        if (locTheoThang == "06") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT6(TinhTien)
        }
        if (locTheoThang == "07") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT7(TinhTien)
        }
        if (locTheoThang == "08") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT8(TinhTien)
        }
        if (locTheoThang == "09") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT9(TinhTien)
        }
        if (locTheoThang == "10") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT10(TinhTien)
        }
        if (locTheoThang == "11") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT11(TinhTien)
        }
        if (locTheoThang == "12") {
          TinhTien = TinhTien + vl.SumMoney
          setAllT12(TinhTien)
        }
      } else {
        setAllT1(0)
        setAllT2(0)
        setAllT3(0)
        setAllT4(0)
        setAllT5(0)
        setAllT6(0)
        setAllT7(0)
        setAllT8(0)
        setAllT9(0)
        setAllT10(0)
        setAllT11(0)
        setAllT12(0)
      }
    })
  }

  const dataMonth = [
    {
      "month": "Tháng 1",
      "Doanh Thu(VND)": allT1,
    },
    {
      "month": "Tháng 2",
      "Doanh Thu(VND)": allT2,
    },
    {
      "month": "Tháng 3",
      "Doanh Thu(VND)": allT3,
    },
    {
      "month": "Tháng 4",
      "Doanh Thu(VND)": allT4,
    },
    {
      "month": "Tháng 5",
      "Doanh Thu(VND)": allT5,
    },
    {
      "month": "Tháng 6",
      "Doanh Thu(VND)": allT6,
    },
    {
      "month": "Tháng 7",
      "Doanh Thu(VND)": allT7,
    },
    {
      "month": "Tháng 8",
      "Doanh Thu(VND)": allT8,
    },
    {
      "month": "Tháng 9",
      "Doanh Thu(VND)": allT9,
    },
    {
      "month": "Tháng 10",
      "Doanh Thu(VND)": allT10,
    },
    {
      "month": "Tháng 11",
      "Doanh Thu(VND)": allT11,
    },
    {
      "month": "Tháng 12",
      "Doanh Thu(VND)": allT12,
    },
  ]

  return (
    <>
      <ScrollToTop />
      <DemoExcel
        open={open}
        setOpen={setOpen}
        danhsachSP={danhsachSP}
      />
      <Page title="Dashboard: DoanhThu">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Doanh Thu
            </Typography>
            <Button variant="outlined" component={RouterLink} to="#" startIcon={<Iconify icon="vscode-icons:file-type-excel" />}
              onClick={handleClickItem}>
              Export Excel
            </Button>
          </Stack>

          <Card>
            <div className='form_doanhThu_top'>
              <div className="doanhThu_date_end">
                <div className="form_dateGG">
                  <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                    style={{ borderColor: colorDateEnd }}
                    min={min}
                    onChange={(e) => setNgayEnd(e.target.value)}
                    onBlur={() => validateDateEnd(formatDateEnd)}
                  />
                  <label className="form__label">Ngày kết thúc</label>
                </div>
              </div>
              <div className="doanhThu_date_start">
                <div className="form_dateGG">
                  <input type="date" className="form__input" placeholder=" " name="Ngày Nhập Update"
                    style={{ borderColor: colorDateStart }}
                    max={max}
                    onChange={(e) => setNgayStart(e.target.value)}
                    onBlur={() => validateDateStart(formatDateStart)}
                  />
                  <label className="form__label">Ngày bắt đầu</label>
                </div>
              </div>
              <div className="doanhThu_date_start">

              </div>
              <div className='form_loading_DT'>
                <div className='btn_loading_DT' >
                  <LoadingSpinnerButton title={'Refresh'}
                    loading={loading} onClick={() => {
                      setSelected([]);
                      getDonHangAdmin();
                      setLoading(true)
                      setTimeout(() => {
                        setLoading(false)
                      }, 2000)
                    }}>
                  </LoadingSpinnerButton>
                </div>
              </div>
            </div>
            <DoanhThuListToolbar selected={selected} numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

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
                        const formatDateDonHang = Moment(val.DateDH).format('YYYY-MM-DD')
                        if (formatDateDonHang >= formatDateStart && formatDateDonHang <= formatDateEnd) {
                          return (
                            <ItemDoanhThu
                              key={val._id}
                              _id={val._id}
                              idUser={val.idUser}
                              DsSP={val.DsSP}
                              NameDH={val.NameDH}
                              PhoneDH={val.PhoneDH}
                              EmailDH={val.EmailDH}
                              AddreeDH={val.AddreeDH}
                              PhuongThucTT={val.PhuongThucTT}
                              SumMoney={val.SumMoney}
                              DateDH={val.DateDH}
                              TrangThaiDH={val.TrangThaiDH}
                              danhsachSP={danhsachSP}
                              setdanhsachSP={setdanhsachSP}
                              isItemSelected={isItemSelected}
                              selected={selected}
                              setSelected={setSelected}
                            />
                          );
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
          <div style={{ display: 'flex', justifyContent: "center", margin: "50px 0" }}>
            <div className="select">
              <select defaultValue={layYear} onChange={(e) => setYear(e.target.value)}>
                {dsYear.map((vl, index) => {
                  return (
                    <option key={index} value={vl}>{vl}</option>
                  )
                })}
              </select>
            </div>
            <Button variant="outlined" component={RouterLink} to="#"
              onClick={onClickRsChart}>
              Reset biểu đồ
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: "center" }} >
            <BarChart width={1000} height={400} data={dataMonth}>
              <CartesianGrid strokeDasharray="2 2 " />
              <XAxis dataKey="month" />
              <YAxis width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Doanh Thu(VND)" fill="#63a3f7" />
            </BarChart>
          </div>
        </Container>
      </Page >
    </>
  );
}
