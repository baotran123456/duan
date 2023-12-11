import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Page from '../components/Page';

import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import axios from "axios";
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  const ip = "http://localhost:8080"

  const [danhSachSP, setDanhSachSP] = useState([]);
  const [danhSachDH, setDanhSachDH] = useState([]);
  const [danhSachDH2, setDanhSachDH2] = useState([]);
  const [danhSachUser, setDanhSachUser] = useState([]);
  const [doanhThu, setDoanhThu] = useState(0);
  let TrangThaiDH = "Giao hàng thành công"


  useEffect(() => {
    axios.get(ip + '/getData')
      .then((response) => {
        setDanhSachSP(response.data);
      })
    axios.get(ip + '/getDataUser')
      .then((response) => {
        setDanhSachUser(response.data);
      })
    axios.get(ip + `/getDonHang`)
      .then((response) => {
        setDanhSachDH2(response.data);
      })
  }, [])

  useEffect(() => {
    axios.get(ip + `/getDonHangAdmin/${TrangThaiDH}`)
      .then((response) => {
        setDanhSachDH(response.data);
      })
    let tong = 0
    danhSachDH.map((vl, index) => {
      tong = tong + vl.SumMoney
    })
    setDoanhThu(tong)
  },)


  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tổng số sản phẩm" total={danhSachSP.length} icon={'eva:layers-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Đơn Hàng" total={danhSachDH2.length} color="info" icon={'wpf:in-transit'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Doanh Thu" total={doanhThu} color="warning" icon={'material-symbols:attach-money-rounded'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Người dùng" total={danhSachUser.length} color="error" icon={'mdi:user-group-outline'} />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
