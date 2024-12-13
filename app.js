const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");


const routeslogin = require("./routes/loginn");
const routesregister = require("./routes/register");
const routescontact = require("./routes/contact");
const controllerHome = require("./controller/controller-home");
const routestodo = require("./routes/todo"); // Jika file berada di parent direktori


// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const session = require("express-session");
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Pastikan secure: false untuk pengembangan lokal
    })
);


// View engine setup
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use("/login", routeslogin);
app.use("/register", routesregister);
app.use("/contact", routescontact);
app.use("/todo", routestodo);



app.get("/home", controllerHome.home);
app.get("/", (req, res) => {
    res.render("login", { title: "Halaman Login" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


