const mongoose = require("mongoose");
const usersSchema =  mongoose.Schema({
    fullname : {
        type: String,
        required: [true, "Please enter a name"]
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},
{
    timestamps: true
}
);
const User = mongoose.model("Users", usersSchema);

module.exports = User;