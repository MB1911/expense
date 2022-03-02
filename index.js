const express = require('express'); //Line 1
const path = require("path");
const app = express(); //Line 2




app.get("/",function(req,res){
	res.send("ok");
})

if(process.env.NODE_ENV === "production")
{
	app.use(express.static(path.join(__dirname, "client", "build")));	
	app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	});	
}

app.get("/demo",(req,res)=>{
	res.send("demo");
})

const port = process.env.PORT || 5000; //Line 3	
app.listen(port, () => console.log(`Listening on port ${port}`));

