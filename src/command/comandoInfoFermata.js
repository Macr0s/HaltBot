var bot = require('../modules/telegram-bot');
var mongo = require('../model/model');

module.exports = function comandoInfoFermata(msg, match) {
	mongo({telegramId:msg.from.id.toString(), name:msg.chat.first_name+" "+msg.chat.last_name, command:[{name:"numero_fermata", date: new Date()}]}, msg.from.id);
 	bot.sendMessage(msg.chat.id, 'Inserisci al posto di "numero_fermata", il numero della fermata in cui ti trovi.');
}