var mongoose = require('mongoose');
var config = require('../config.js');

mongoose.connect(config.mongo);
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
command : [commandSchema],
preferiti : []
});

var User = mongoose.model('User', userSchema);

module.exports = {
	persist: function(userObj, userId) {
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
				temp.preferiti = user[0].preferiti;
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
	},
	addPreferito: function(userId, preferito) {
		User.find({telegramId: userId}, function(err, user){
			var newPreferiti = user[0];
			if(newPreferiti.preferiti.indexOf(preferito) == -1){
				newPreferiti.preferiti.push(preferito);
				newPreferiti.save(function(err, data) {
					if(err) console.log(err);
					else console.log("saved", data);			
				});
			}
		});
	},
	getPreferito: function(cb) {
		User.find({telegramId: arguments[1]}, function(err, user){
			cb(user[0].preferiti);
		});
	}, 
	deletePreferito: function(userId, preferito) {
		User.find({telegramId: userId}, function(err, user){
			var i = 1;
			var temp = user[0];
			var preferiti = user[0].preferiti;
			if(preferiti[0].indexOf(preferito) > -1)
				temp.preferiti.splice(0,1);
			else {
				for(i=1; i<preferiti.length; i++) {
					if(preferiti[i].indexOf(preferito) > -1) {
						temp.preferiti.splice(i, i);
						console.log(temp);
					}
				}
			}
			temp.save(function(err, data){
				if(err) console.log(err);
				else console.log("saved", data);
			});
		});
	},
	getAll: function(cb) {
		User.find({}, function(err, user){
			cb(user);
		});
	}
}