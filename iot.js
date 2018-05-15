var express = require("express");
var app = express();
var port = 3000;
 
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/iot");

var gpsdataSchema = new mongoose.Schema({
	id: String,
	lat: String,
	longitude: String,
	battery: String
	})

var Sensor = mongoose.model("sensor", gpsdataSchema);
app.get("/log", (req, res) => {
	var lat = req.query.lat,
		longitude = req.query.longitude,
		id = req.query.id,
		battery = req.query.battery;

	console.log(id, lat, longitude, battery);

	var data = new Sensor({
				id:id,
				lat: lat,
				longitude: longitude,
				battery: battery
			});
	data.save();
});
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});
