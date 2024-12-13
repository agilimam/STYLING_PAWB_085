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

module.exports = {
    getcontact(req, res) {
        connection.query('SELECT * FROM contact;', function (error, results) {
            if (error) throw error;

            // Log to debug
            console.log('Results: ', results);

            // Check if results contains any data
            if (results.length > 0) {
                res.render('contact', {
                    url: 'http://localhost:3000/',
                    contacts: results, // Pass the contacts data to the view
                    showNavbar: true, // Tambahkan ini untuk mendefinisikan showNavbar
                    currentPage: 'contact' // Tambahkan ini untuk menandai halaman yang aktif
                });
            } else {
                res.render('contact', {
                    url: 'http://localhost:3000/',
                    contacts: [], // Pass an empty array if no data
                    showNavbar: true, // Tambahkan ini untuk mendefinisikan showNavbar
                    currentPage: 'contact' // Tambahkan ini untuk menandai halaman yang aktif
                });
            }
        });
    },

    formContact(req, res) {
        res.render("addContact", {
            url: 'http://localhost:3000/',
        });
    },
}