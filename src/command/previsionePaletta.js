var bot = require('../modules/telegram-bot');
var tempiPaletta = require('../modules/atac-api');
var mongo = require('../model/model');

module.exports = function previsionePaletta(msg, match) {
	var paletta = msg.text;
	paletta = paletta.substring(1, paletta.length);
	paletta = parseInt(paletta);

  	var value = tempiPaletta.getTempiPaletta(function(value){
	    // Results of the method response
	    var mess = "";
	    if (value == undefined)
	    	bot.sendMessage(msg.chat.id, "Mi dispiace ma il numero della fermata che hai inserito non esiste");
	    else {
		    var temp = value.risposta.arrivi;
		    if (temp.length == 0) {
		    	mongo({telegramId:msg.from.id.toString(), command:[{name:"previsione_paletta"+paletta.toString(), date: new Date()}]}, msg.from.id);
		    	bot.sendMessage(msg.chat.id, "Nessuna informazione disponibile");
		    }
		    else {
			    for (var element in temp) {
			    	if (temp[element]["distanza_fermate"] == 1) 
			    		mess = mess+temp[element].linea+" : In arrivo.\n";
			    	else 
			    		mess = mess+temp[element].linea+" : "+temp[element]["distanza_fermate"]+" fermate attesa "+ temp[element]["tempo_attesa"]+" minuti."+"\n";
			    }
			    mongo({telegramId:msg.from.id.toString(), name:msg.chat.first_name+" "+msg.chat.last_name, command:[{name:"previsione_paletta"+paletta.toString(), date: new Date()}]}, msg.from.id);
			    bot.sendMessage(msg.chat.id, mess);
			}
		}
  }, paletta);
}