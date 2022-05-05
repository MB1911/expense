const mongoose = require("mongoose");
const{Schema}=mongoose;

const user_sch = new Schema({
	"userId":"string",
	"username":"string",
	"pic":"string"
})

module.exports = mongoose.model("exp_user",user_sch);