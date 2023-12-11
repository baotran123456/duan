import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Button } from '@material-ui/core';
import DsDonHangList from './DsDonHangList';
import axios from "axios";

const ExportCSV = (props) => {
    const fileName = "Doanh_Thu_excel";
    const [DsDonHang, setDsDonHang] = useState([]);
    const [loading, setLoading] = useState(false);

    const headers = [
        { label: "Mã đơn hàng", key: "_id" },
        { label: "Tên đơn hàng", key: "NameDH" },
        { label: "SĐT", key: "PhoneDH" },
        { label: "Email", key: "EmailDH" },
        { label: "Địa chỉ", key: "AddreeDH" },
        { label: "Phương thức thanh toán", key: "PhuongThucTT" },
        { label: "Ngày", key: "DateDH" },
        { label: "Trạng thái", key: "TrangThaiDH" },
        { label: "Tổng giá trị(VND)", key: "SumMoney" },
    ];

    useEffect(() => {
        getDsDonHangList();
    },);

    const getDsDonHangList = () => {
        setLoading(true);
        setDsDonHang(props.danhsachSP)
    }

    return (
        <div className='container'>
            <Button
                variant="contained"
                color="primary"
                className='export-btn'
                style={{ marginBottom: '2%' }}
            >
                <CSVLink
                    headers={headers}
                    data={DsDonHang}
                    filename={fileName}
                    style={{ "textDecoration": "none", "color": "#fff" }}
                >
                    {loading ? 'Loading csv...' : 'Export Data'}
                </CSVLink>
            </Button>

            <DsDonHangList headers={headers} DsDonHang={DsDonHang} />
        </div>
    );
}

export default ExportCSV;