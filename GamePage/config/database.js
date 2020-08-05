const mongoose = require("mongoose");

// ------------------- Connect the db -------------------
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
});

module.exports = mongoose;
