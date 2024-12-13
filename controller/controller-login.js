const mysql = require("mysql");
const dbdatabase = require("../db/tododb");
const connection = mysql.createConnection(dbdatabase);

// Koneksi ke database
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    console.log("Connected to the database!");
});

// Fungsi untuk mengambil data login
exports.getlogin = (req, res) => {
    const query = "SELECT * FROM login";
    connection.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching data:", err.message);
            res.status(500).send("Error fetching data");
        } else {
            res.render("login", { data: result });
        }
    });
};

exports.handleLogin = (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM login WHERE nama = ? AND pw = ?";
    connection.query(query, [username, password], (err, result) => {
        if (err) {
            console.error("Error fetching data:", err.message);
            res.status(500).send("Error fetching data");
        } else {
            if (result.length > 0) {
                // Set session setelah login berhasil
                req.session.loggedin = true;
                req.session.username = username; // Simpan username ke session
                res.redirect("/home"); // Redirect ke halaman home
            } else {
                res.status(401).send("Gagal"); // Jika login gagal
            }
        }
    });
};
