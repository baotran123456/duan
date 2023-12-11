import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import DoanhThu from './pages/DoanhThu';
import LoaiSP from './pages/LoaiSP';
import SaleSP from './pages/SaleSP';
import { useEffect, useState } from 'react';
import PhanHoi from './pages/PhanHoi';
import TrangThai from './pages/TrangThai';

// ----------------------------------------------------------------------

export default function Router(props) {


  return useRoutes([
    {
      path: props.pathLogin,
      element: <Login />,
    },
    {
      path: props.pathRegister,
      element: <Register />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: props.pathUser, element: <User /> },
        { path: props.pathProducts, element: <Products /> },
        { path: props.pathLoaiSP, element: <LoaiSP /> },
        { path: props.pathSaleSP, element: <SaleSP /> },
        { path: props.pathTrangThai, element: <TrangThai /> },
        { path: props.pathBlog, element: <Blog /> },
        { path: props.pathDanhThu, element: <DoanhThu /> },
        { path: props.pathPhanHoi, element: <PhanHoi /> },
      ],
    },

    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
