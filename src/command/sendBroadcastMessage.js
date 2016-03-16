var mongo = require('../model/model');
var bot = require('../modules/telegram-bot');

mongo.getAll(function(users){
	var list_telegramId = [];
	var i = 0;
	for(i=0; i<users.length; i++) {
		var telegramId = users[i].telegramId
		if(list_telegramId.indexOf(telegramId) == -1)
			list_telegramId.push(telegramId);
	}
	for(var element in list_telegramId) {
		bot.sendMessage(list_telegramId[element], "Ciao,\nfinalmente i miei sviluppatori mi hanno aggiornato e da oggi puoi salvare i preferiti.\nUtilizza il comando /preferiti per saperne di più.\n\nTi ricordo di passare sulla mia pagina facebook a dirmi cosa ne pensi del nuovo comando: https://www.facebook.com/HaltBot-1570579906598343/ e di invitare i tuoi amici alla pagina 😜");
	}
}); 