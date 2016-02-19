var bot = require('../modules/telegram-bot');
var mongo = require('../model/model');

module.exports = function comandoStart(msg, match) {
	mongo({telegramId:msg.from.id.toString(), name:msg.chat.first_name+" "+msg.chat.last_name, command:[{name:"help", date: new Date()}]}, msg.from.id);
 	bot.sendMessage(msg.chat.id, 'Eccoti una lista di comandi che puoi chiedermi:\n1. /numero_fermata\n2. /numero_linea');
}