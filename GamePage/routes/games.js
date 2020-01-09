// configuration for multer and cloudinary
const multer = require("multer");
const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
const imageFilter = function(req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });

// regular configuration
const express = require("express");
const router = express.Router();
const gamesCtrl = require("../controllers/games");

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
};

router.get("/", isLoggedIn, gamesCtrl.index);
router.get("/new", gamesCtrl.newGame);
router.get("/:id", gamesCtrl.showGame);
router.post("/", isLoggedIn, upload.single("image"), gamesCtrl.createGame);
router.get("/:id/edit", isLoggedIn, gamesCtrl.editGame);
router.put("/:id", upload.single("image"), gamesCtrl.updateGame);
router.delete("/:id", gamesCtrl.deleteGame);

module.exports = router;
