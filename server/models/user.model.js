const mongoose = require("mongoose");
const userModel = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: String,
        image: String

    },
    {
        timestamps: true,
    },
    { strict: false }
);

const User = mongoose.model("users", userModel);
module.exports = User;