var bot = require('../modules/telegram-bot');
var mongo = require('../model/model');

module.exports = function comandoStart(msg, match) {
	mongo.persist({telegramId:msg.from.id.toString(), name:msg.chat.first_name+" "+msg.chat.last_name, command:[{name:"start", date: new Date()}], preferiti: []}, msg.from.id);
 	bot.sendMessage(msg.chat.id, 'Benvenuto nel mondo dei pendolari, eccoti una lista di comandi che puoi chiedermi:\n1. /numero_fermata\n2. /numero_linea\n\nSeguici su facebook, sia per segnalarci errori che nuove funzionalità: https://www.facebook.com/HaltBot-1570579906598343/');
}