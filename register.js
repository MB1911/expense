const mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");
const{Schema}=mongoose;

const reg_user_sch = new Schema({
	"username":"string",
	"password":"string"
})

reg_user_sch.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, 10);
    console.log(this.password);
    next();
});

reg_user_sch.methods.comparePassword = function(plaintext, callback) {
    return callback(null, Bcrypt.compareSync(plaintext, this.password));
};

module.exports = mongoose.model("reg_exp_user",reg_user_sch);