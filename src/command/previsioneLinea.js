var bot = require('../modules/telegram-bot');
var atac = require('../modules/atac-api/index');
var mongo = require('../model/model');

module.exports = {
	previsioneLinea: function(msg, match) {
		var linea = msg.text.toUpperCase();
		linea = linea.substring(1, linea.length);
		var direzioni = []
		var all_capolinea = []

		var value = atac.getCapolinea(function(value) {
			percorsi = value.risposta.percorsi;
			if(percorsi == 0) {
				bot.sendMessage(msg.chat.id, 'mi dispiace ma non ho trovato nessuna linea di autobus');
			}
			else {
				mongo({telegramId:msg.from.id.toString(), name:msg.chat.first_name+" "+msg.chat.last_name, command:[{name:"previsione_linea"+linea, date: new Date()}]}, msg.from.id);
				for(var element in percorsi) {
					if(percorsi[element].id_linea == linea) {
						all_capolinea.push([percorsi[element].id_percorso+" - "+ percorsi[element].direzione + " "+ percorsi[element].carteggio_dec]);
						direzioni.push(percorsi[element].direzione + " "+ percorsi[element].carteggio_dec);
					}
				}

				if(direzioni[1] == undefined) {
					bot.sendMessage(msg.chat.id, 'Scegli la direzione:\n1) '+direzioni[0], {
			        	reply_markup: JSON.stringify({
			            keyboard: [ [ bus_stop[0]+" - "+direzioni[0] ] ],
			            resize_keyboard: true,
			            one_time_keyboard: true
			        	})
		    		});
				}
				else {
					bot.sendMessage(msg.chat.id, 'Scegli la direzione:\n1) '+direzioni[0]+'\n2) '+direzioni[1], {
			        	reply_markup: JSON.stringify({
			            keyboard: all_capolinea,
			            resize_keyboard: true,
			            one_time_keyboard: true
			        	})
		    		});
		    	}
			}
		},linea);
	}, 
	getFermate: function(msg, match) {
		var numero_direzione = parseInt(msg.text);
		atac.getFermate(function(fermate) {
			if(fermate == undefined) 
				bot.sendMessage(msg.chat.id, 'Mi dispiace ma non ho trovato nessun autobus');
			else {
				var stop = fermate.risposta.fermate;
				var response = "Inserisci il comando /numero_fermata, a seconda di dove ti trovi:\n";
				for(var element in stop) {
					response = response.concat("/"+stop[element].id_palina+" - "+stop[element].nome+"\n");
				}
				bot.sendMessage(msg.chat.id, response);
			}
		}, numero_direzione);
	}
}

