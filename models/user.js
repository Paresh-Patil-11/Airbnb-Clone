const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const plugin = require("passport-local-mongoose");
const passportLocalMongoose = plugin.default || plugin;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);