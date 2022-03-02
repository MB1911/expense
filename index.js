const express = require('express'); //Line 1
const path = require("path");
const app = express(); //Line 2

app.use(express.static(path.join(__dirname, "client", "build")));


app.get("/",function(req,res){
	res.send("ok");
})


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
const port = process.env.PORT || 5000; //Line 3	
app.listen(port, () => console.log(`Listening on port ${port}`));

