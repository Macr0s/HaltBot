var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/trebus')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected");
});

var Schema = mongoose.Schema;

var commandSchema = new Schema({
	name: String, 
	date: Date
});

var userSchema = new Schema({
telegramId : String,
name: String,
command : [commandSchema]
});

var User = mongoose.model('User', userSchema);

module.exports = function(userObj, userId) {
	var temp = new User(userObj);
	User.find({telegramId: userId}, function(err, user) {
		if(err) console.log(err);
		if(user == 0) {
			temp.save(function(err, data) {
			if(err) console.log(err);
			else console.log("saved", data);
			});
		}
		else {
			temp.command = temp.command.concat(user[0].command);
			User.remove(user[0], function(err){
				if(err) console.log(err);
			});
			temp.save(function(err, data) {
				if(err) console.log(err);
				else console.log("saved", data);
			});
		}
	});
}