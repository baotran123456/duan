import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import Moment from 'moment';

const DsDonHangList = ({ headers, DsDonHang }) => {

    const [TongTien, setTongTien] = useState()

    let FormatSumMoney = new Intl.NumberFormat("it-IT").format(TongTien);

    useEffect(() => {
        let TinhTien = 0;
        DsDonHang.map((vl) => {
            TinhTien = TinhTien + vl.SumMoney
            setTongTien(TinhTien)
        })
    })

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {headers.map(row => {
                            return (
                                <TableCell key={row.key} style={{ "fontWeight": "bold" }}>{row.label}</TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {DsDonHang.map((row) => {
                        const formatDate = Moment(row.DateDH).format('DD/MM/YYYY')
                        let SumMoney = new Intl.NumberFormat("it-IT").format(row.SumMoney);
                        return (
                            <TableRow
                                key={row._id}
                            >
                                <TableCell>{row._id}</TableCell>
                                <TableCell>{row.NameDH}</TableCell>
                                <TableCell>{row.PhoneDH}</TableCell>
                                <TableCell>{row.EmailDH}</TableCell>
                                <TableCell>{row.AddreeDH}</TableCell>
                                <TableCell>{row.PhuongThucTT}</TableCell>
                                <TableCell>{formatDate}</TableCell>
                                <TableCell>{row.TrangThaiDH}</TableCell>
                                <TableCell>{SumMoney}</TableCell>
                            </TableRow>
                        )
                    })

                    }
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>{FormatSumMoney}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer >
    );
}

export default DsDonHangList;