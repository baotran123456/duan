

import axios from "axios";
// css
import "../css/dialog.css"


export default function ItemDHChiTiet(props) {

    const ip = "http://localhost:8080"

    let TongTienSP = new Intl.NumberFormat("it-IT").format(props.SoLuongSP * props.GiaCX);


    return (
        <div className="frames_ChiTiet_DH" style={{ display: "flex" }}>
            <div className="img_ChiTiet_DH">
                <div>
                    {props.Image.map((file, index) => {
                        // console.log("chi tiết tt: " + file);
                        return (
                            <img key={index} src={ip + `/${file[0].filePath}`} width="90" height="130" style={{ borderRadius: '6px' }} />
                        )
                    }
                    )}
                </div>
            </div>
            {/* --------------- tên  ----------------- */}
            <div className="name_ChiTiet_DH">
                {props.NameSP}
            </div>
            {/* --------------- GiaCX ----------------- */}
            <div className="sdt_ChiTiet_DH">
                {props.GiaCX}
            </div>
            {/* --------------- Soluong ----------------- */}
            <div className="soluong_ChiTiet_DH">
                {props.SoLuongSP}
            </div>
            {/* --------------- Tong tien SP ----------------- */}
            <div className="tongTien_ChiTiet_DH">
                {TongTienSP}VND
            </div>
        </div>
    )
} 