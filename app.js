var express = require('express'),
  path = require('path'),
  app = express();

var routes = require("./routes");

app.set("port",process.env.PORT || 3000);
app.set("views",path.join(__dirname,"public/views"));
app.set("view engine","ejs");

app.use(routes);
app.use(express.static('public'));


app.listen(app.get("port"), function(){
  console.log("Server started on port "+ app.get("port"));


});
