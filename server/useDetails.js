const mongoose = require("mongoose");

// ============================== User admin ===============================

const UserDetailsScehma = new mongoose.Schema(
    {
        uname: String,
        taikhoan: { type: String, unique: true },
        pass: String,
    },
    {
        collection: "UserInfoAdmin",
    }
);

mongoose.model("UserInfoAdmin", UserDetailsScehma);

// ============================== Add product SP ===============================

const Add_product_sp = new mongoose.Schema(
    {
        idImg: { type: Number, unique: true },
        NameSP: String,
        GiaGocSP: Number,
        GiaBanSP: Number,
        SoLuongSP: Number,
        DateNhapSP: Date,
        SaleSP: Number,
        TrangThaiSP: String,
        LoaiSP: String,
        ChiTietSP: String,
    },
    {
        collection: "Product_SP",
    },
);

mongoose.model("Product_SP", Add_product_sp);


// ============================= Add loai SP ===============================

const Add_LoaiSP = new mongoose.Schema(
    {
        ImageLoaiSP: String,
        NameLoaiSP: String,
        MotaLoaiSP: String,
        TrangThaiLoaiSP: String,
    },
    {
        collection: "LoaiSP",
    },
);

mongoose.model("LoaiSP", Add_LoaiSP);

// ============================= Add Sale SP ===============================

const Add_SaleSP = new mongoose.Schema(
    {
        NameSaleSP: String,
        PhanTramGiamGia: Number,
        NgayTaoSale: Date,
        NgayEndSale: Date,
        TrangThaiSale: String,
    },
    {
        collection: "SaleSP",
    },
);

mongoose.model("SaleSP", Add_SaleSP);

// ============================= Blog ===============================

const Blog = new mongoose.Schema(
    {
        ImageBlog: String,
        DateBlog: Date,
        TenBlog: String,
        LikeBlog: String,
        CmtBlog: String,
        ShareBlog: String,
    },
    {
        collection: "Blog",
    },
);

mongoose.model("Blog", Blog);

// ============================= Image sp ===============================
const FileImage = new mongoose.Schema({
    idImg: { type: Number, unique: true },
    files: [Object]
}, { timestamps: true });

mongoose.model('FileImage', FileImage);

// ============================= Log User ===============================
const UserInfo = new mongoose.Schema(
    {
        TKUser: { type: String, unique: true },
        EmailUser: String,
        passUser: String,
        TrangThaiUser: String
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserInfo);

// ============================= Liên hệ phản hồi ===============================
const PhanHoi = new mongoose.Schema(
    {
        Name: String,
        Email: String,
        SDT: Number,
        DiaChi: String,
        Mota: String,
        Date: Date,
    },
    {
        collection: "PhanHoi",
    }
);

mongoose.model("PhanHoi", PhanHoi);

// ============================= Giỏ hàng ===============================
const GioHang = new mongoose.Schema(
    {
        idUser: String,
        Image: Array,
        idImg: Number,
        NameSP: String,
        GiaCX: Number,
        GiaBanSP: Number,
        SoLuongSP: Number,
        SaleSP: Number,
        TrangThaiSP: String,
        LoaiSP: String,
        ChiTietSP: String,
    },
    {
        collection: "GioHang",
    }
);

mongoose.model("GioHang", GioHang);

// ============================== Sản phẩm ưu thích===============================

// const YeuThich = new mongoose.Schema(
//     {
//         idUser: String,
//         Image: Array,
//         idImg: Number,
//         NameSP: String,
//         GiaGocSP: Number,
//         GiaBanSP: Number,
//         SoLuongSP: Number,
//         SaleSP: Number,
//         TrangThaiSP: String,
//         LoaiSP: String,
//         ChiTietSP: String,
//     },
//     {
//         collection: "YeuThich",
//     },
// );

// mongoose.model("YeuThich", YeuThich);

// ============================= Đơn Hàng ===============================
const DonHang = new mongoose.Schema(
    {
        idUser: String,
        DsSP: Array,
        NameDH: String,
        PhoneDH: String,
        EmailDH: String,
        AddreeDH: String,
        PhuongThucTT: String,
        SumMoney: Number,
        DateDH: Date,
        TrangThaiDH: String,
    },
    {
        collection: "DonHang",
    }
);

mongoose.model("DonHang", DonHang);

// ============================= Bình luận ===============================
const BinhLuan = new mongoose.Schema(
    {
        idImg: Number,
        NameUser: String,
        Date: Date,
        NoiDung: String,
    },
    {
        collection: "BinhLuan",
    }
);

mongoose.model("BinhLuan", BinhLuan);
