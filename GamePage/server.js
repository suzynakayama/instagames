const cors = require("cors");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");

// ------------------- Import the Routes -------------------
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const gamesRouter = require("./routes/games");
const commentsRouter = require("./routes/comments");
const apiRouter = require("./routes/api/apiRouter");

// ------------------- Config/use Db, Passportjs, dotenv and Cloudinary -------------------
require("dotenv").config();
require("./config/database");
require("./config/passport");
require("cloudinary").config({
    cloud_name: "instagames",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// ------------------- Create Express App -------------------
const app = express();

// ------------------- View Engine Setup -------------------
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ------------------- Middlewares -------------------
app.use(cors());                                    //# habilitate CORS (cross-origin resource sharing)
app.use(logger("dev"));                             //# logs the requests
app.use(express.json());                            //#  Parses data sent in the body of the request and populates 
app.use(express.urlencoded({ extended: false }));   //# a req.body object with the data
app.use(cookieParser());                            //# Populates a cookies property on the req object
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));    //# set the path of the static assets (css, js, img)
app.use(methodOverride("_method"));                      //# To use Put/Patch/Delete on the client using HTML (only get/post)

// ------------------- Use Routes -------------------
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/games", gamesRouter);
app.use("/", commentsRouter);
app.use("/api", apiRouter);

// ------------------- catch 404 and forward to error handler -------------------
app.use(function(req, res, next) {
    next(createError(404));
});

// ------------------- error handler -------------------
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
