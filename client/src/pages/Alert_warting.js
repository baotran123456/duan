import React from 'react'
// css
import '../css/add_product.css';
import '../css/dialog.css';

// gọi ảnh
import succes_add from "../assets/success_add.png"
function Alert_warting(props) {

    return (
        // <div>
        //     <div>
        //         <button className='add_them' style={{ display: "none" }}>Thêm</button>
        //         <div className="alert hide">
        //             <img src={succes_add} width='28' height='28' />
        //             <p className="msg">{props.setNameShowBtn}</p>
        //             <div className="btn_alert_add">
        //                 x
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div>
            <div className="alert hide">
                <img src={succes_add} width='28' height='28' />
                <p className="msg">{props.NameShowBtn}</p>
                <div className="btn_alert_add">
                    x
                </div>
            </div>
        </div>
    )
}

export default Alert_warting
