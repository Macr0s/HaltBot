var bot = require('../modules/telegram-bot');
var mongo = require('../model/model');
var tempiPaletta = require('../modules/atac-api');

module.exports = {
	comandoPreferiti: function(msg, match) {
		mongo.getPreferito(function(preferiti) {
			var i = 0;
			var mess = "";
			if(preferiti.length == 0) {
				bot.sendMessage(msg.chat.id, "Mi dispiace ma non hai salvato nessun preferito.\n\nPer salvarne uno basta fare il comando add seguito dal numero della fermata, ad esempio /add70951 e per rimuoverlo facendo il comando remove ad esempio /remove70951");
			}
			else {
				for(i=0; i<preferiti.length; i++) {
					mess = mess + preferiti[i] + "\n";
				}
				bot.sendMessage(msg.chat.id, "Ecco la lista dei tuoi preferiti:\n"+mess+"\n\nTi ricordiamo che per salvare un preferito basta fare il comando add seguito dal numero della fermata, ad esempio /add70951 e per rimuoverlo facendo il comando remove ad esempio /remove70951");
			}
		}, msg.from.id);
	},
	addPreferito: function(msg, match) {
		var preferito = msg.text.substring(4, msg.text.length);
		tempiPaletta.getTempiPaletta(function(value){
			var mess = "";
			if (value == undefined)
	    		bot.sendMessage(msg.chat.id, "Mi dispiace ma il numero della fermata che hai inserito non esiste");
	    	else {
	    		var temp = value.risposta;
	    		mess = "/"+preferito+" - "+temp.nome;
	    		mongo.addPreferito(msg.from.id, mess);
	    		bot.sendMessage(msg.chat.id, "Il preferito è stato salvato correttamente, utilizza /remove"+preferito+" per eliminarlo dai preferiti");
	    	}
		}, parseInt(preferito));
	}, 
	removePreferito: function(msg, match) {
		mongo.getPreferito(function(value){
			var preferito = msg.text.substring(7, msg.text.length);
			var i = 0;
			var j = 0;
			for(j=0; j<value.length; j++){
				if(value[j]!=undefined && value[j].indexOf(preferito) > -1)
					i = 1;
			}
			if(i == 1) {
				mongo.deletePreferito(msg.from.id, preferito);
				bot.sendMessage(msg.chat.id, "Il preferito "+msg.text+" è stato rimosso");
			}
			else bot.sendMessage(msg.chat.id, msg.text+" non fa parte dei tuoi preferiti");
		}, msg.from.id);
	}
}