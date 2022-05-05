const express = require('express'); //Line 1
const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
const{Schema}=mongoose;
const User = require("./user");
const Reg_User = require("./register");
const Transaction = require("./transaction");
const Transaction_Type = require("./type");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Bcrypt = require("bcryptjs");
const reader = require('xlsx');
require('dotenv').config();
const app = express(); //Line 2

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieSession({
maxAge:30 * 24 * 60 * 60 * 1000,
keys:["jhloopppeskoutrdfghy"]
}));
app.use(passport.initialize());
app.use(passport.session())


mongoose.connect(process.env.MONGO);
// app.get("/",function(req,res){
// 	res.send("ok");
// })
app.get("/demo",function(req,res){
	res.send("nnok");
})

if(process.env.NODE_ENV === "production")
{
	app.use(express.static(path.join(__dirname, "client", "build")));	
	app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	});

	app.get("/demo",function(req,res){
	res.send("ok");
})	


passport.use(new GoogleStrategy({
clientID:process.env.CLIENT_ID,
	clientSecret:process.env.CLIENT_SECRET,
	callbackURL:process.env.CALLBACK_URL
},
async function (accessToken,refreshToken,profile,done){

	let existinguser = await User.findOne({userId:profile.id})
	if(existinguser)
	{
		

		return done(null,existinguser);
	}
	else
	{
		
		let newuser = await new User({userId:profile.id,username:profile.displayName,pic:profile._json.picture});
		let final_user = await newuser.save();
		console.log(profile.displayName)
		return done(null,final_user);
	}
}
));

app.get("/expense/proflie",async function(req,res){
res.send(req.user);
})
app.get("/expense/ex",(req,res)=>{

	res.send("ok");
})
app.get("/auth/google",passport.authenticate('google',{scope:["profile"]}));
app.get("/auth/callback",passport.authenticate('google',{failureRedirect:'/login',successRedirect:"http://localhost:3000/dashboard"}));


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});




passport.use(new LocalStrategy(
	function(username,password,done){
		Reg_User.findOne({username:username},function(err,user){
			if(err){
				return done(err);
			}
			if(!user){
				return done(null,false);
			}
			// var user =  Reg_User.findOne({ username: username }).exec();
			// if (user.password != password) { return done(null, false); }
			// console.log(user);
			console.log(password,user.password);
			 if(!Bcrypt.compareSync(password, user.password)) {
			 	console.log(password,user.password);
            return done(null,false);
        }
      		return done(null, user);

		})
	}
))
app.post("/expense/auth/local",passport.authenticate("local",{failureRedirect:'/'}),function(req,res){

	res.send("ok");
});

app.post("/expense/register",async(req,res)=>{
	const exuser = await Reg_User.findOne({username:req.body.username});
	if(exuser)
	{
		res.send("User is alredy exist please select new username!!");
	}
	else
	{
		const newuser = await new Reg_User({username:req.body.username,password:req.body.password});
		const final_user = await newuser.save();
		if(final_user){
			res.send("User register successfully!!!");
		}
	}
})


app.post("/expense/transaction",async(req,res)=>{



	const tra = await new Transaction();
	tra.user = mongoose.Types.ObjectId(req.user._id);
	tra.type = req.body.type,
	tra.date = req.body.date,
	tra.ammount = req.body.ammount
	const ftra = await tra.save();
	if(ftra)
	{
		res.send("transaction added!!!");
	}
})

app.post("/expense/viewbymonth",async(req,res)=>{

	let arr = [];
	const id = mongoose.Types.ObjectId(req.user._id);
	const total = await Transaction.countDocuments({user:id});
	const trall = await Transaction.find({user:id}).sort({_id:-1}).limit(3);
	// console.log(trall);
	for(let i=0;i<trall.length;i++)
	{
		if(trall[i].date.getMonth()+1 == req.body.month && trall[i].date.getFullYear() == req.body.year)
		{
			arr.push(trall[i])
		}	
	}
	res.send(arr);
	
})
app.post("/expense/alltransaction",async(req,res)=>{

	let arr = [];
	const id = mongoose.Types.ObjectId(req.user._id);
	const total = await Transaction.countDocuments({user:id});
	let num = req.body.num;
	let trall;
	if(num){
		console.log(num);
		trall = await Transaction.find({user:id}).sort({_id:-1}).limit(parseInt(num));	
	}
	if(!num)
	{
		console.log("ok");
		trall = await Transaction.find({user:id}).sort({_id:-1});
	}
	for(let i=0;i<trall.length;i++)
	{
		if(trall[i].date.getMonth()+1 == req.body.month && trall[i].date.getFullYear() == req.body.year)
		{
			arr.push(trall[i])
		}	
	}
	console.log(num);
	res.send(arr);
})
app.post("/expense/filter",async(req,res)=>{
	let by =req.body.by;
	const id = mongoose.Types.ObjectId(req.user._id);
	
		const trall = await Transaction.find({user:id,$expr:{$eq:[{$year:"$date"},by]}}).sort({_id:-1});
		console.log(trall);
		res.send(trall);	
	
})
app.get("/expense/sortbymonth",async(req,res)=>{

	const id = mongoose.Types.ObjectId(req.user._id);
	let labels = [];
	let data = [];
	let mname = ["jan","feb","march","april","may","june","july","aug","sept","oct","nov","dec"];
	let dcs = await Transaction.aggregate().match({"ammount":{$lt:0},user:id}).group({_id:{month:{$month:"$date"},year:{$year:"$date"}},total:{$sum:"$ammount"}});
	mname.sort((d1, d2) => d1._id - d2._id);
	console.log("data");
	for(let i=0;i<dcs.length;i++)
	{
		if(dcs[i]._id.year == new Date().getFullYear())
		{

			labels.push(mname[dcs[i]._id.month-1]);	
			data.push(dcs[i].total);
		}
		
	}
	let f = {
		labels,
		data
	}
	console.log(f);
	res.send(f);

})

app.post("/expense/expensebymonth",async(req,res)=>{
	// let dcs = await Transaction.aggregate().group({_id:{month:{$month:"$date"},year:{$year:"$date"},type:{$type:"$type"},total:{$sum:"$ammount"}}});
	const id = mongoose.Types.ObjectId(req.user._id);
	let dcs = await Transaction.aggregate().match({"ammount":{$lt:0},user:id}).group({_id:{type:"$type",month:{$month:"$date"},year:{$year:"$date"}},total:{$sum:"$ammount"}});
	let labels = [];
	let data = [];
	for(let i=0;i<dcs.length;i++)
	{
		if(dcs[i]._id.month == req.body.month &&  dcs[i]._id.year == req.body.year)
		{
			labels.push(dcs[i]._id.type);	
			data.push(Math.abs(dcs[i].total));
		}
		
	}
	let f = {
		labels,
		data
	}
	console.log("mydata",f);
	console.log(dcs);
	res.send(f);
})

app.get("/expense/balance",async(req,res)=>{
	const id = mongoose.Types.ObjectId(req.user._id);
	let dcs = await Transaction.aggregate().match({"ammount":{$lt:0},user:id}).group({_id:{month:{$month:"$date"},year:{$year:"$date"}},total:{$sum:"$ammount"}});
	let dcs1 = await Transaction.aggregate().match({"ammount":{$gt:0},user:id}).group({_id:{month:{$month:"$date"},year:{$year:"$date"}},total:{$sum:"$ammount"}});
	let fdata = [];
	for(let i=0;i<dcs.length;i++)
	{
		fdata.push({
			month:dcs[i]._id.month,
			year:dcs[i]._id.year,
			totalexpense:dcs[i].total,
			totalsaving:dcs1[i].total + dcs[i].total
		})
		
	}
	console.log(fdata);
	res.send(fdata);
})
app.post("/expense/group",async(req,res)=>{

	const id = mongoose.Types.ObjectId(req.user._id);
	let dcs = await Transaction.aggregate().match({user:id}).group({_id:{type:"$type",month:{$month:"$date"},year:{$year:"$date"}},total:{$sum:"$ammount"}});
	let data = [];
	
	for(let i=0;i<dcs.length;i++)
	{
		if(dcs[i]._id.month == req.body.month &&  dcs[i]._id.year == req.body.year)
		{
			
			data.push({type:dcs[i]._id.type,total:dcs[i].total});
		}
		
	}
	console.log(data);
	res.send(data);
})



app.post("/expense/report",async(req,res)=>{

	

		const id = mongoose.Types.ObjectId(req.user._id);
		let arr = [];
		let total = 0;
		const data = await Transaction.find({user:id});
		for(let i=0;i<data.length;i++)
		{
		if(data[i].date.getMonth()+1 == req.body.month && data[i].date.getFullYear() == req.body.year)
		{
			total = total + data[i].ammount;
			arr.push({type:data[i].type,ammount:data[i].ammount,date:data[i].date})
		}	
		}
		
		console.log(total);
		const edata =[{name:"mb",age:"20"},{name:"amit",age:"25"}]	
		console.log(arr,edata);
		const file = reader.utils.book_new();
		const ws = reader.utils.json_to_sheet(arr);
		reader.utils.sheet_add_aoa(ws, [
  ["total",total]
], {origin: -1});
		reader.utils.book_append_sheet(file,ws,"newsheet11");
		reader.writeFile(file,"./expense.xlsx");	
		res.sendFile(__dirname+'/expense.xlsx');

})

app.post("/expense/group/cat",async(req,res)=>{

	const id = mongoose.Types.ObjectId(req.user._id);
	let dcs = await Transaction.aggregate().match({user:id}).group({_id:{type:"$type",month:{$month:"$date"},year:{$year:"$date"}},total:{$sum:"$ammount"}});
	let data = [];

	for(let i=0;i<dcs.length;i++)
	{
		if(dcs[i]._id.month == req.body.month &&  dcs[i]._id.year == req.body.year && dcs[i]._id.type == req.body.cat)
		{
			
			data.push({type:dcs[i]._id.type,total:dcs[i].total});
		}
		
	}
	console.log(dcs);
	res.send(data);
})

app.post("/expense/group/ammount",async(req,res)=>{

	const id = mongoose.Types.ObjectId(req.user._id);
	let dcs = await Transaction.aggregate().match({user:id}).group({_id:{type:"$type",month:{$month:"$date"},year:{$year:"$date"}},total:{$sum:"$ammount"}});
	let data = [];

	for(let i=0;i<dcs.length;i++)
	{
		if(dcs[i]._id.month == req.body.month &&  dcs[i]._id.year == req.body.year  )
		{
			if( Math.abs(dcs[i].total) <= parseInt(req.body.up_limit) && Math.abs(dcs[i].total) >= parseInt(req.body.low_limit))
			data.push({type:dcs[i]._id.type,total:dcs[i].total});
		}
		
	}
	console.log(data);
	res.send(data);
})
app.post("/expense/expensebycategory",async(req,res)=>{

	const id = mongoose.Types.ObjectId(req.user._id);
	// const trall = await Transaction.find({user:id,$expr:{$eq:[{$year:"$date"},by]}}).sort({_id:-1});

	const data = await Transaction.find({user:id,type:req.body.cat,$and:[
		{$expr:{$eq:[{$year:"$date"},"2022"]}}, 
		{$expr:{$eq:[{$month:"$date"},"03"]}}]});
	console.log(data);
	res.send(data);
})
app.post("/expense/add/type",async(req,res)=>{

	const type = await new Transaction_Type();
	type.user = mongoose.Types.ObjectId(req.user._id);
	type.category = req.body.name;
	type.save(function(err,document){
		if(err)
		{
			res.send(err.errors['category'].message);	
			return;
		}
		else
		{
			res.send("Type creted!!!");
		}
		
	})

})
app.get("/expense/view/type",async(req,res)=>{

	let dcs = await Transaction.aggregate().match({user:mongoose.Types.ObjectId(req.user._id)}).group({_id:{type:"$type"}});
	// const cat = await Transaction.find({user:mongoose.Types.ObjectId(req.user._id)});
	let data =[];
	for(let i=0;i<dcs.length;i++)
	{
			data.push({type:dcs[i]._id.type});	
	}
	console.log(data);
	res.send(data);
})
app.post("/expense/by/id",async(req,res)=>{

	const id = mongoose.Types.ObjectId(req.body.id);
	const tra = await Transaction.findOne({_id:id});
	res.send(tra);

})
app.post("/expense/edit",async(req,res)=>{
		const type = req.body.type;
		const ammount = req.body.ammount;
		const date = req.body.date;
		const id = mongoose.Types.ObjectId(req.body.id);
		const update = await Transaction.findOneAndUpdate({_id:id},{type:type,date:date,ammount:ammount},{new:true});
		console.log(update);
		res.send(update);
})
app.get("/viewtransaction",async(req,res)=>{

	const id = mongoose.Types.ObjectId(req.user._id);
	const trall = await Transaction.find({user:id});
	res.send(trall);
})
app.post("/expense/delete",async(req,res)=>{

	const id = mongoose.Types.ObjectId(req.body.id);
	const data = await Transaction.findOneAndDelete({_id:id});
	console.log(id);
	res.send(data);
})
app.get("/",(req,res)=>{
	res.send("home");
})
app.get("/logout",(req,res)=>{
	req.logout();
	res.redirect("http://localhost:3000");
})
}
const port = process.env.PORT || 5000; //Line 3	
app.listen(port, () => console.log(`Listening on port ${port}`));

