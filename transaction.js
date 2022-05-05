const mongoose = require("mongoose");
const{Schema}=mongoose;

const tra_schem = new Schema({
	"user":{
		type:Schema.Types.ObjectId,
		ref:"Author"
	},
	"type":"string",
	"ammount":"number",
	"date":"date"
})
 module.exports = mongoose.model("expense_transactioin",tra_schem);