// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig_Chx = [

    {
        title: 'dashboard',
        path: '/dashboard/app',
        icon: getIcon('eva:pie-chart-2-fill'),
    },
    {
        title: 'user',
        path: '/dashboard/user',
        icon: getIcon('eva:people-fill'),
    },
    {
        title: 'Sản phẩm',
        path: '/dashboard/products',
        icon: getIcon('eva:shopping-bag-fill'),
    },
    {
        title: 'Loại Sản Phẩm',
        path: '/dashboard/loaisp',
        icon: getIcon('eva:layers-fill'),
    },
    {
        title: 'Mã giảm Giá',
        path: '/dashboard/salesp',
        icon: getIcon('ic:baseline-discount'),
    },
    {
        title: 'Trạng thái đơn hàng',
        path: '/dashboard/trangthai',
        icon: getIcon('wpf:in-transit'),
    },
    {
        title: 'Blog',
        path: '/dashboard/blog',
        icon: getIcon('brandico:blogger-rect'),
    },
    {
        title: 'Doanh Thu',
        path: '/dashboard/doanhthu',
        icon: getIcon('eva:trending-up-fill'),
    },
    {
        title: 'Phản hồi',
        path: '/dashboard/phanhoi',
        icon: getIcon('ic:round-feedback'),
    },

    {
        title: 'Not found',
        path: '/404',
        icon: getIcon('eva:alert-triangle-fill'),
    },
];


export default navConfig_Chx;
