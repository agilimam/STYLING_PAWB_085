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
    getTodoList(req, res) {
        connection.query("SELECT * FROM todo;", (error, results) => {
            if (error) {
                console.error("Error retrieving todo list:", error);
                res.status(500).send("Error retrieving todo list");
                return;
            }

            res.render("todo", {
                url: "http://localhost:3000/",
                todos: results,
                showNavbar: true,
                currentPage: "todo"
            });
        });
    },

    formTodo(req, res) {
        res.render("addTodo", {
            url: "http://localhost:3000/"
        });
    },

    saveTodo(req, res) {
        const { title, description } = req.body;

        if (title && description) {
            connection.query(
                "INSERT INTO todo (Nama, Deskripsi) VALUES (?, ?);",
                [title, description],
                (error) => {
                    if (error) {
                        console.error("Error saving todo:", error);
                        res.status(500).send("Failed to save data");
                        return;
                    }

                    res.redirect("/todo");
                }
            );
        } else {
            res.status(400).send("Incomplete data");
        }
    },

    editTodo(req, res) {
        const { id } = req.params;

        connection.query(
            "SELECT * FROM todo WHERE id = ?;",
            [id],
            (error, results) => {
                if (error) {
                    console.error("Error retrieving todo for edit:", error);
                    res.status(500).send("Error retrieving todo");
                    return;
                }

                if (results.length > 0) {
                    res.render("editTodo", {
                        url: "http://localhost:3000/",
                        todo: results[0]
                    });
                } else {
                    res.redirect("/todo");
                }
            }
        );
    },

    updateTodo(req, res) {
        const { id } = req.params;
        const { title, description } = req.body;

        connection.query(
            "UPDATE todo SET Nama = ?, Deskripsi = ? WHERE id = ?;",
            [title, description, id],
            (error) => {
                if (error) {
                    console.error("Error updating todo:", error);
                    res.status(500).send("Failed to update data");
                    return;
                }

                res.redirect("/todo");
            }
        );
    },

    deleteTodo(req, res) {
        const { id } = req.params;

        connection.query(
            "DELETE FROM todo WHERE id = ?;",
            [id],
            (error) => {
                if (error) {
                    console.error("Error deleting todo:", error);
                    res.status(500).send("Failed to delete data");
                    return;
                }

                res.redirect("/todo");
            }
        );
    }
};
