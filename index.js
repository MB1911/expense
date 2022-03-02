const express = require('express'); //Line 1
const app = express(); //Line 2



app.get("/",function(req,res){
	res.send("ok");
})

const port = process.env.PORT || 5000; //Line 3	
app.listen(port, () => console.log(`Listening on port ${port}`));

