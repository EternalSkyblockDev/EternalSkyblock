const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5163;
const crypto = require("crypto");
const { Pool } = require("pg");
const session = require ("express-session");
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(express.static('public'));

express()
.use(express.static(path.join(__dirname, "public")))
.use(express.json())
.use(express.urlencoded({ extended: true }))
.use(session({
    secret: process.env.SESSION_KEY,
    cookie: {
        sameSite: "strict"
    },
    resave: false,
    saveUninitialized: true
}))
.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
})
.set("views", path.join(__dirname, "views"))
.set("view engine", "ejs")
.get("/", async(req, res) => {
    res.render("pages.index.ejs");
})

.listen(PORT, () => console.log(`Listening on ${PORT}`));