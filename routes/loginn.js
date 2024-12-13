const express = require("express");
const router = express.Router();
const controllerlogin = require("../controller/controller-login");  // Pastikan path ini benar

// Route GET untuk menampilkan halaman login
router.get("/", controllerlogin.getlogin);

// Route POST untuk menangani login
router.post("/", controllerlogin.handleLogin);  // Fungsi ini akan menghandle proses login

module.exports = router;
