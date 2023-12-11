const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const multer = require('multer');
const paypal = require('paypal-rest-sdk');
const fs = require('fs');
const exphdbs = require('express-handlebars');





const app = express();


app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, "views"));
app.engine('handlebars', exphdbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var nodemailer = require('nodemailer');


const JWT_SECREST = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe"



const db = require("./config/key").mongoURI;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongodB Connected...."))
    .catch((err) => console.log(err));


const PORT = process.env.PORT || 8080;

app.get('/getThanhCong', (req, res) => {
    res.send('Hoàn tất')
})

app.post("/post", async (req, res) => {
    console.log(req.body);
    const { data } = req.body;
    try {
        if (data == "adarsh") {
            res.send({ status: "ok" });
        } else {
            res.send({ status: "User Not found" });

        }
    } catch (error) {
        res.send({ status: "Something went wrong try again" });
    }
});

// ------------------------gọi điều hướng------------------------------------

require("./useDetails");


const UserAdmin = mongoose.model("UserInfoAdmin");

const Product_sp = mongoose.model("Product_SP");

const LoaiSP = mongoose.model("LoaiSP");

const SaleSP = mongoose.model("SaleSP");

const Blog = mongoose.model("Blog");

const FileImage = mongoose.model("FileImage");

const UserInfo = mongoose.model("UserInfo");

const PhanHoi = mongoose.model("PhanHoi");

const GioHang = mongoose.model("GioHang");

// const YeuThich = mongoose.model("YeuThich");

const DonHang = mongoose.model("DonHang");

const BinhLuan = mongoose.model("BinhLuan");


// ------------------------Register Admin------------------------------------

app.post("/register-admin", async (req, res) => {

    const { uname, taikhoan, pass } = req.body;

    const encryptedPassword = await bcrypt.hash(pass, 2)

    try {

        const oldUserAdmin = await UserAdmin.findOne({ taikhoan });

        if (oldUserAdmin && res.status(201)) {
            return res.json({ error: "Trùng tài khoản" });
        }

        await UserAdmin.create({
            uname: uname,
            taikhoan: taikhoan,
            pass: encryptedPassword,
        });
        res.send({ status: "Ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

// ------------------------Register User------------------------------------

app.post("/register_User", async (req, res) => {

    const { TKUser, EmailUser, passUser, TrangThaiUser } = req.body;

    const encryptedPassword = await bcrypt.hash(passUser, 2)

    try {

        const TKUserChx = await UserInfo.findOne({ TKUser });
        const EmailUserChx = await UserInfo.findOne({ EmailUser });

        if (TKUserChx && res.status(201)) {
            return res.json({ error: "Trùng tài khoản" });
        }
        if (EmailUserChx && res.status(201)) {
            return res.json({ error: "Trùng Email" });
        }

        await UserInfo.create({
            TKUser: TKUser,
            EmailUser: EmailUser,
            passUser: encryptedPassword,
            TrangThaiUser: TrangThaiUser,
        });
        return res.json({ status: "Ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

// ------------------------Login Admin------------------------------------

app.post("/login-admin", async (req, res) => {

    const { taikhoan, pass } = req.body;

    const userAdmin = await UserAdmin.findOne({ taikhoan });
    if (res.status(201)) {
        if (!userAdmin) {
            return res.json({ error: "Tài khoản không tồn tại" });
        }
        if (await bcrypt.compare(pass, userAdmin.pass)) {
            const token = jwt.sign({ taikhoan: userAdmin.taikhoan }, JWT_SECREST);

            if (res.status(201)) {
                return res.json({ status: "oke", data: token });
            } else {
                return res.json({ error: "error" })
            }
        }

        return res.json({ status: "error", error: "Mật khẩu sai" })
    }
})

// ------------------------Login User------------------------------------

app.post("/login_User", async (req, res) => {

    const { TKUser, passUser, } = req.body;

    const userUser = await UserInfo.findOne({ TKUser });
    if (res.status(201)) {
        if (!userUser) {
            return res.json({ error: "Tài khoản không tồn tại" });
        }
        if (await bcrypt.compare(passUser, userUser.passUser)) {
            const token = jwt.sign({ TKUser: userUser.TKUser }, JWT_SECREST);

            if (res.status(201)) {
                return res.json({ status: "oke", data: token });
            } else {
                return res.json({ error: "error" })
            }
        }

        return res.json({ status: "error", error: "Mật khẩu sai" })
    }
})

// ------------------------get login Admin------------------------------------

app.post("/UserAdmin-data", async (req, res) => {

    const { token } = req.body;

    try {

        const user = jwt.verify(token, JWT_SECREST);
        const userTK = user.taikhoan;
        UserAdmin.findOne({ taikhoan: userTK })
            .then((data => {
                res.send({ status: "oke", data: data })
            }))

    } catch (error) {
        res.send({ status: "error", data: error })
    }
})

// ------------------------get login user------------------------------------

app.post("/User_data", async (req, res) => {

    const { token } = req.body;

    try {

        const user = jwt.verify(token, JWT_SECREST);
        const TKUser = user.TKUser;
        UserInfo.findOne({ TKUser: TKUser })
            .then((data => {
                res.send({ status: "oke", data: data })
            }))

    } catch (error) {
        res.send({ status: "error", data: error })
    }
})

// ------------------------forgot-password------------------------------------

app.post("/forgot-password", async (req, res) => {
    const { EmailUser } = req.body;
    try {
        const oldUser = await UserInfo.findOne({ EmailUser });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }

        const secret = JWT_SECREST + oldUser.passUser;
        const token = jwt.sign({ EmailUser: oldUser.EmailUser, id: oldUser._id }, secret, {
            expiresIn: "5m",
        });
        const link = `http://localhost:8080/reset-password/${oldUser._id}/${token}`;
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "hungdqpk01759@fpt.edu.vn",
                pass: "hilarykendyrule?2479541",
            },
        });

        var mailOptions = {
            from: "hungdqpk01759@fpt.edu.vn",
            to: oldUser.EmailUser,
            subject: "Password Reset",
            text: link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        console.log(link);
        return res.json({ status: "User thành công" });
    } catch (error) { }
})

app.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    // console.log(req.params);
    const oldUser = await UserInfo.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECREST + oldUser.passUser;
    try {
        const verify = jwt.verify(token, secret);
        res.render("index.ejs", { EmailUser: verify.EmailUser, status: "Not Verified" });
    } catch (error) {
        console.log(error);
        res.send("Not Verified");
    }
});

app.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await UserInfo.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECREST + oldUser.passUser;
    try {
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 2);
        await UserInfo.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    passUser: encryptedPassword,
                },
            }
        );


        res.render("index.ejs", { EmailUser: verify.EmailUser, status: "verified" });
    } catch (error) {
        console.log(error);
        res.json({ status: "Something Went Wrong" });
    }
});


// --------------------------Upload img--------------------------------------

// Xác định file chứa hình ảnh
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
let linkimg = null;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, linkimg = new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

//phần này là check đuôi hình ảnh
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}
const upload = multer({ storage: storage, fileFilter: filefilter });

// up nhiều hình lên
app.post('/multipleFiles', upload.array('files'), async (req, res, next) => {
    try {
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });

        await FileImage.create({
            idImg: req.body.idImg,
            files: filesArray
        });
        res.status(201).send('Files Uploaded Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// update 1 hinh`
app.post('/uploadFileAPI', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file);
    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
})


// --------------------------add --------------------------------------


app.post("/add_Product", async (req, res) => {

    const { idImg, NameSP, GiaGocSP, GiaBanSP, SoLuongSP
        , DateNhapSP, SaleSP, TrangThaiSP, LoaiSP, ChiTietSP } = req.body;

    try {

        await Product_sp.create({
            idImg: idImg,
            NameSP: NameSP,
            GiaGocSP: GiaGocSP,
            GiaBanSP: GiaBanSP,
            SoLuongSP: SoLuongSP,
            DateNhapSP: DateNhapSP,
            SaleSP: SaleSP,
            TrangThaiSP: TrangThaiSP,
            LoaiSP: LoaiSP,
            ChiTietSP: ChiTietSP,
        });
        res.send({ status: "Ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});



//loaisp
app.post("/add_LoaiSP", async (req, res) => {

    const { NameLoaiSP, MotaLoaiSP, TrangThaiLoaiSP } = req.body;

    try {

        await LoaiSP.create({
            ImageLoaiSP: linkimg,
            NameLoaiSP: NameLoaiSP,
            MotaLoaiSP: MotaLoaiSP,
            TrangThaiLoaiSP: TrangThaiLoaiSP,
        });
        res.send({ status: "Ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

//Sale Sp
app.post("/add_SaleSP", async (req, res) => {

    const { NameSaleSP, PhanTramGiamGia
        , NgayTaoSale, NgayEndSale, TrangThaiSale } = req.body;

    try {

        await SaleSP.create({
            NameSaleSP: NameSaleSP,
            PhanTramGiamGia: PhanTramGiamGia,
            NgayTaoSale: NgayTaoSale,
            NgayEndSale: NgayEndSale,
            TrangThaiSale: TrangThaiSale,
        });
        res.send({ status: "Ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});


//Blog
app.post("/add_Blog", async (req, res) => {

    const { DateBlog
        , TenBlog, LikeBlog, CmtBlog, ShareBlog } = req.body;

    try {

        await Blog.create({
            ImageBlog: linkimg,
            DateBlog: DateBlog,
            TenBlog: TenBlog,
            LikeBlog: LikeBlog,
            CmtBlog: CmtBlog,
            ShareBlog: ShareBlog,
        });
        res.send({ status: "Ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

// Phan hoi

app.post("/add_PhanHoi", async (req, res) => {

    const { Name, Email, SDT, DiaChi, Mota, Date } = req.body;

    try {

        await PhanHoi.create({
            Name: Name,
            Email: Email,
            SDT: SDT,
            DiaChi: DiaChi,
            Mota: Mota,
            Date: Date,
        });
        res.send({ status: "Ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

// Giỏ hàng

app.post("/add_GioHang", async (req, res) => {

    const { idUser, Image, idImg, NameSP,
        GiaCX, GiaBanSP, SoLuongSP, SaleSP,
        TrangThaiSP, LoaiSP, ChiTietSP } = req.body;

    try {
        await GioHang.create({
            idUser: idUser,
            Image: Image,
            idImg: idImg,
            NameSP: NameSP,
            GiaCX: GiaCX,
            GiaBanSP: GiaBanSP,
            SoLuongSP: SoLuongSP,
            SaleSP: SaleSP,
            TrangThaiSP: TrangThaiSP,
            LoaiSP: LoaiSP,
            ChiTietSP: ChiTietSP,
        });
        res.send({ status: "Ok" });

    } catch (error) {
        res.send({ status: "error" });

    }
});

// Yêu thích

// app.post("/add_YeuThich", async (req, res) => {

//     const { idUser, Image, idImg, NameSP,
//         GiaGocSP, GiaBanSP, SoLuongSP, SaleSP,
//         TrangThaiSP, LoaiSP, ChiTietSP } = req.body;

//     try {
//         await YeuThich.create({
//             idUser: idUser,
//             Image: Image,
//             idImg: idImg,
//             NameSP: NameSP,
//             GiaGocSP: GiaGocSP,
//             GiaBanSP: GiaBanSP,
//             SoLuongSP: SoLuongSP,
//             SaleSP: SaleSP,
//             TrangThaiSP: TrangThaiSP,
//             LoaiSP: LoaiSP,
//             ChiTietSP: ChiTietSP,
//         });
//         res.send({ status: "Ok" });

//     } catch (error) {
//         res.send({ status: "error" });

//     }
// });


// Don Hang
app.post("/add_DonHang", async (req, res) => {

    const { idUser, DsSP, NameDH, PhoneDH,
        EmailDH, AddreeDH, PhuongThucTT, SumMoney,
        DateDH, TrangThaiDH } = req.body;

    try {
        await DonHang.create({
            idUser: idUser,
            DsSP: DsSP,
            NameDH: NameDH,
            PhoneDH: PhoneDH,
            EmailDH: EmailDH,
            AddreeDH: AddreeDH,
            PhuongThucTT: PhuongThucTT,
            SumMoney: SumMoney,
            DateDH: DateDH,
            TrangThaiDH: TrangThaiDH,

        });
        res.send({ status: "Ok" });

    } catch (error) {
        res.send({ status: "error" });

    }
});

// Don Hang
app.post("/add_BinhLuan", async (req, res) => {

    const { idImg, NameUser, Date, NoiDung } = req.body;

    try {
        await BinhLuan.create({
            idImg: idImg,
            NameUser: NameUser,
            Date: Date,
            NoiDung: NoiDung,

        });
        res.send({ status: "Ok" });

    } catch (error) {
        res.send({ status: "error" });

    }
});

// ----------------------------- update dulieu--------------------------------

// sp
app.put("/UpdateSP/:_id", (req, res) => {
    let SP = {
        NameSP: req.body.NameSP,
        GiaGocSP: req.body.GiaGocSP,
        GiaBanSP: req.body.GiaBanSP,
        SoLuongSP: req.body.SoLuongSP,
        DateNhapSP: req.body.DateNhapSP,
        SaleSP: req.body.SaleSP,
        TrangThaiSP: req.body.TrangThaiSP,
        LoaiSP: req.body.LoaiSP,
        ChiTietSP: req.body.ChiTietSP,
    }

    Product_sp.updateOne(
        { _id: req.params._id },
        { $set: SP },
        (err, result) => {
            if (err) throw err
            res.send(SP);
        })
})

app.put("/UpdateSPTheoSale/:_id", (req, res) => {
    let getSaleSP = {
        SaleSP: req.body.SaleSP,
    }

    Product_sp.updateOne(
        { _id: req.params._id },
        { $set: getSaleSP },
        (err, result) => {
            if (err) throw err
            res.send(getSaleSP);
        })
})


// Loai SP
app.put("/UpdateLoaiSP/:_id", (req, res) => {

    if (linkimg == null) {
        linkimg = req.body.linkhinhanhsua;
    }

    let putSP = {
        ImageLoaiSP: linkimg,
        NameLoaiSP: req.body.NameLoaiSP,
        MotaLoaiSP: req.body.MotaLoaiSP,
        TrangThaiLoaiSP: req.body.TrangThaiLoaiSP,
    }

    LoaiSP.updateOne(
        { _id: req.params._id },
        { $set: putSP },
        (err, result) => {
            if (err) throw err
            res.send(putSP);
        })
})

// Sale SP
app.put("/UpdateSaleSP/:_id", (req, res) => {


    let putSale = {
        NameSaleSP: req.body.NameSaleSP,
        PhanTramGiamGia: req.body.PhanTramGiamGia,
        NgayTaoSale: req.body.NgayTaoSale,
        NgayEndSale: req.body.NgayEndSale,
        TrangThaiSale: req.body.TrangThaiSale,
    }

    SaleSP.updateOne(
        { _id: req.params._id },
        { $set: putSale },
        (err, result) => {
            if (err) throw err
            res.send(putSale);
        })
})

// Blog
app.put("/UpdateBlog/:_id", (req, res) => {
    if (linkimg == null) {
        linkimg = req.body.linkhinhanhsua;
    }


    let putBlog = {
        ImageBlog: linkimg,
        DateBlog: req.body.DateBlog,
        TenBlog: req.body.TenBlog,
        LikeBlog: req.body.LikeBlog,
        CmtBlog: req.body.CmtBlog,
        ShareBlog: req.body.ShareBlog,
    }

    Blog.updateOne(
        { _id: req.params._id },
        { $set: putBlog },
        (err, result) => {
            if (err) throw err
            res.send(putBlog);
        })
})

// User
app.put("/UpdateUser/:_id", (req, res) => {

    let putUser = {
        TKUser: req.body.TKUser,
        EmailUser: req.body.EmailUser,
        TrangThaiUser: req.body.TrangThaiUser,
    }

    UserInfo.updateOne(
        { _id: req.params._id },
        { $set: putUser },
        (err, result) => {
            if (err) throw err
            res.send(putUser);
        })
})

// Update Gio hang
app.put("/UpdateGioHang/:idImg/:idUser", (req, res) => {
    const { SoLuongSP } = req.body;

    let putGioHang = {
        SoLuongSP: SoLuongSP,
    }

    GioHang.updateOne(
        {
            idImg: req.params.idImg,
            idUser: req.params.idUser
        },
        { $set: putGioHang },
        (err, result) => {
            if (err) throw err
            res.send(putGioHang);
        })
})

// Update sp Gio hang lien tuc 
app.put("/UpdateSPGioHang/:idImg", (req, res) => {
    const { Image, idImg, NameSP,
        GiaCX, GiaBanSP, SoLuongSP, SaleSP,
        TrangThaiSP, LoaiSP, ChiTietSP } = req.body;

    let putSPGioHang = {
        Image: Image,
        NameSP: NameSP,
        GiaCX: GiaCX,
        GiaBanSP: GiaBanSP,
        SaleSP: SaleSP,
        TrangThaiSP: TrangThaiSP,
        LoaiSP: LoaiSP,
        ChiTietSP: ChiTietSP,
    }

    GioHang.updateOne(
        { idImg: req.params.idImg },
        { $set: putSPGioHang },
        (err, result) => {
            if (err) throw err
            res.send(putSPGioHang);
        })
})

// Update Don hang
app.put("/UpdateDonHang/:_id", (req, res) => {
    const { NameDH, PhoneDH,
        EmailDH, AddreeDH,
        DateDH, TrangThaiDH } = req.body;

    let putDonHang = {
        NameDH: NameDH,
        PhoneDH: PhoneDH,
        EmailDH: EmailDH,
        AddreeDH: AddreeDH,
        DateDH: DateDH,
        TrangThaiDH: TrangThaiDH,
    }

    DonHang.updateOne(
        { _id: req.params._id },
        { $set: putDonHang },
        (err, result) => {
            if (err) throw err
            res.send(putDonHang);
        })
})


// -----------------------------delete dulieu ------------------------------

// sp
app.delete("/DeleteSP/:idImg", (req, res) => {
    Product_sp.deleteOne(
        { idImg: req.params.idImg },
        (err, result) => {
            if (err) throw err
            res.send("Delete thanh cong")
        })
})

// img

app.delete("/DeleteImg/:idImg", (req, res) => {
    FileImage.deleteOne(
        { idImg: req.params.idImg },
        (err, result) => {
            if (err) throw err
            res.send("Delete thanh cong")
        })
})


// Loai SP

app.delete("/DeleteLoaiSP/:_id", (req, res) => {
    LoaiSP.deleteOne(
        { _id: req.params._id },
        (err, result) => {
            if (err) throw err
            res.send("Delete thanh cong")
        })
})

// Sale SP

app.delete("/DeleteSoaiSP/:_id", (req, res) => {
    SaleSP.deleteOne(
        { _id: req.params._id },
        (err, result) => {
            if (err) throw err
            res.send("Delete thanh cong")
        })
})

// blog

app.delete("/DeleteBlog/:_id", (req, res) => {
    Blog.deleteOne(
        { _id: req.params._id },
        (err, result) => {
            if (err) throw err
            res.send("Delete thanh cong")
        })
})

// User
app.delete("/DeleteUser/:_id", (req, res) => {
    UserInfo.deleteOne(
        { _id: req.params._id },
        (err, result) => {
            if (err) throw err
            res.send("Delete thanh cong")
        })
})

// Phan Hoi
app.delete("/DeletePhanHoi/:_id", (req, res) => {
    PhanHoi.deleteOne(
        { _id: req.params._id },
        (err, result) => {
            if (err) throw err
            res.send("Delete thanh cong")
        })
})

// Gio hang
app.delete("/DeleteGioHang/:_id", (req, res) => {
    GioHang.deleteOne(
        { _id: req.params._id },
        (err, result) => {
            if (err) throw err
            res.send("Delete thanh cong")
        })
})

// delete Gio hang khi xóa sản phẩm trên admin
app.delete("/DeleteGioHangAdmin/:idImg", (req, res) => {
    GioHang.deleteOne(
        {
            idImg: req.params.idImg,
        },
        (err, result) => {
            if (err) throw err
            res.send("Delete thanh cong")
        })
})

// delete Don Hang
app.delete("/DeleteDonHang/:_id", (req, res) => {
    DonHang.deleteOne(
        {
            _id: req.params._id,
        },
        (err, result) => {
            if (err) throw err
            res.send("Delete thanh cong")
        })
})

// delete Binh Luan
app.delete("/DeleteBinhLuan/:_id", (req, res) => {
    BinhLuan.deleteOne(
        {
            _id: req.params._id,
        },
        (err, result) => {
            if (err) throw err
            res.send("Delete thanh cong")
        })
})



// ----------------------------- get du lieu--------------------------------

// sp
app.get("/getData", async (req, res) => {
    Product_sp.find((err, result) => {
        if (err) throw err
        res.send(result)
    })
})

app.get("/getData/:LoaiSP", async (req, res) => {
    Product_sp.find({ LoaiSP: req.params.LoaiSP }, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

app.get("/getData/:LoaiSP", async (req, res) => {
    Product_sp.find({ LoaiSP: req.params.LoaiSP }, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})


// Loai sp
app.get("/getDataLoaiSP", async (req, res) => {
    LoaiSP.find((err, result) => {
        if (err) throw err
        res.send(result)
    })
})


// Sale sp
app.get("/getDataSaleSP", async (req, res) => {
    SaleSP.find((err, result) => {
        if (err) throw err
        res.send(result)
    })
})
app.get("/getDataSaleDate/:PhanTramGiamGia", async (req, res) => {
    SaleSP.find({ PhanTramGiamGia: req.params.PhanTramGiamGia }, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

// Blog 
app.get("/getDataBlog", async (req, res) => {
    Blog.find((err, result) => {
        if (err) throw err
        res.send(result)
    })
})

// lấy nhiều hình về
app.get('/getMultipleFiles', async (req, res, next) => {
    try {
        const files = await FileImage.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.get("/getImg/:idImg", async (req, res) => {
    FileImage.find({ idImg: parseInt(req.params.idImg) }, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})
// app.get("/getImg", async (req, res) => {
//     FileImage.find((err, result) => {
//         if (err) throw err
//         res.send(result)
//     })
// })


// User
app.get("/getDataUser", async (req, res) => {
    UserInfo.find((err, result) => {
        if (err) throw err
        res.send(result)
    })
})

// Phan hoi
app.get("/getDataPhanHoi", async (req, res) => {
    PhanHoi.find((err, result) => {
        if (err) throw err
        res.send(result)
    })
})

// get gio hang
app.get("/getGioHang/:idUser", async (req, res) => {
    GioHang.find({ idUser: req.params.idUser }, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

// get Đơn hàng
app.get("/getDonHang", async (req, res) => {
    DonHang.find((err, result) => {
        if (err) throw err
        res.send(result)
    })
})

app.get("/getDonHangUser/:idUser", async (req, res) => {
    DonHang.find({ idUser: req.params.idUser }, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

app.get("/getDonHangAdmin/:TrangThaiDH", async (req, res) => {
    DonHang.find({ TrangThaiDH: req.params.TrangThaiDH }, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

// Binh luan
app.get("/getBinhLuan/:idImg", async (req, res) => {
    BinhLuan.find({ idImg: req.params.idImg }, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

// ================================= thanh toan bang paypal===============================
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AWKNHa4p0tlHyCOyEp_aKLkFQ_FqqeZUxm9EBNLHjuORhGGPqj0ls1ewbTahcHeSBCMb0RTyXV5pP8Qw',
    'client_secret': 'ENT90sFcvimeywoBNsK1x87chCdPnmexxh4C3o7BUn-wxsAtj6jeKMDeYrMZmyCOV3Uijc3ii-xwNAtu'
});




app.get('/', function (req, res) {
    res.render('index.handlebars');
});

var total = 0
var Name = ""

var idUser1 = ""
var DsSP1 = []
var NameDH1 = ""
var PhoneDH1 = ""
var EmailDH1 = ""
var AddreeDH1 = ""
var PhuongThucTT1 = ""
var SumMoney1 = ""
var DateDH1 = ""
var TrangThaiDH1 = ""
var ArrayIdSPGH1 = []


app.post('/DsSP', function (req, res) {
    const { idUser, DsSP, NameDH, PhoneDH,
        EmailDH, AddreeDH, PhuongThucTT, SumMoney,
        DateDH, TrangThaiDH, money, ArrayIdSPGH } = req.body;
    res.render('index.handlebars');
    Name = NameDH
    format = money / 23000
    total = Math.round(format)

    idUser1 = idUser
    DsSP1 = DsSP
    NameDH1 = NameDH
    PhoneDH1 = PhoneDH
    EmailDH1 = EmailDH
    AddreeDH1 = AddreeDH
    PhuongThucTT1 = PhuongThucTT
    SumMoney1 = SumMoney
    DateDH1 = DateDH
    TrangThaiDH1 = TrangThaiDH
    ArrayIdSPGH1 = ArrayIdSPGH

});



app.post('/pay', function (req, res) {


    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:8080/success",
            "cancel_url": "http://localhost:8080/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": Name,
                    "sku": "001",
                    "price": total.toString(),
                    "currency": "USD",
                    "quantity": 1
                }]

            },
            "amount": {
                "currency": "USD",
                "total": total.toString()
            },
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            res.render('cancle');
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

});
app.get('/cancle', function (req, res) {
    res.render('cancle');
});
app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": total.toString()
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            res.render('cancle');
        } else {
            console.log(JSON.stringify(payment));
            res.render('success');
            try {
                DonHang.create({
                    idUser: idUser1,
                    DsSP: DsSP1,
                    NameDH: NameDH1,
                    PhoneDH: PhoneDH1,
                    EmailDH: EmailDH1,
                    AddreeDH: AddreeDH1,
                    PhuongThucTT: PhuongThucTT1,
                    SumMoney: SumMoney1,
                    DateDH: DateDH1,
                    TrangThaiDH: TrangThaiDH1,

                });
                // res.send({ status: "Ok" });
                ArrayIdSPGH1.map((vl) => {
                    GioHang.deleteOne(
                        { _id: vl },
                        (err, result) => {
                            if (err) throw err
                            // res.send("Delete thanh cong")
                        })
                })
            } catch (error) {
                res.send({ status: "error" });

            }


        }
    });

});

app.get('/cancel', (req, res) => res.send('Cancelled'));


app.listen(PORT, console.log(`server run with port ${PORT}`))

