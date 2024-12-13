const express = require("express");
const router = express.Router();
const controllerregister = require("../controller/controller-register");  // Pastikan path ini benar

// Route GET untuk menampilkan halaman register
router.get("/", (req, res) => {
    res.render("register");
});

// Route POST untuk menangani form register
router.post("/", controllerregister.createakun);  // Fungsi untuk menambah akun baru

module.exports = router;
