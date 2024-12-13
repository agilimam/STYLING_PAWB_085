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

// Fungsi untuk membuat akun baru
exports.createakun = (req, res) => {
    const { username, password } = req.body;
    const query = "INSERT INTO login (nama, pw) VALUES (?, ?)";
    connection.query(query, [username, password], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err.message);
            res.status(500).send("Error inserting data");
        } else {
            console.log("Data successfully added:", result);
            res.redirect("/login");  // Redirect kembali ke halaman login setelah sukses
        }
    });
};
