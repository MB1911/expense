const mongoose = require("mongoose");
const{Schema}=mongoose;

const type_sch = new Schema({

	"user":{
		type:Schema.Types.ObjectId,
		ref:"user"
	},
	"category":{
		type:"String",
		required:[true,"Category required"]
	}
})

module.exports = mongoose.model("exp_type",type_sch);