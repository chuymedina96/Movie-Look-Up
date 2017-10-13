var  express      = require("express"),
     app          = express(),
     request      = require("request"),
     bodyParser   = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//GETS
app.get("/", function(req, res){
    res.render("form");
});
app.get("/result", function(req, res) {
    var query = (req.query.search);
    var url = ("http://www.omdbapi.com/?s=");
    var key = ("&apikey=thewdb");
    request(url + query + key, function(error, responce, body){
        if(!error && responce.statusCode === 200) {
        var data = JSON.parse(body);
        res.render("result", {data: data});
    } 
    });
});

app.get("*", function(req, res){
    res.send("These are not the droids you are looking for!");
});
//SERVER
app.listen(process.env.PORT || 3000, function(){
    console.log("Server has started!");
});