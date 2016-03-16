var bot = require('../modules/telegram-bot');
var mongo = require('../model/model');

module.exports = function comandoInfoLinea(msg, match) {
	mongo.persist({telegramId:msg.from.id.toString(), name:msg.chat.first_name+" "+msg.chat.last_name, command:[{name:"numero_linea", date: new Date()}], preferiti: []}, msg.from.id);
 	bot.sendMessage(msg.chat.id, 'Inserisci al posto di "numero_linea", il numero della linea di tuo interesse, ad esempio /170');
}