/**
 * TODO: Questa dovrebbe diventare una classe strutturata, che offra metodi del tipo:
 * getTempiPaletta(paletta)
 * getTempiLinea(linea)
 */
var bot = require('../telegram-bot/index');
var xmlrpc = require('xmlrpc');
var fs = require('fs')
var path = require('path');

function autenticazioneAtac(cb) {
  var filePath = path.join(__dirname, 'atacToken.txt');
  fs.readFile(filePath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
    var client = xmlrpc.createClient({
    host: 'muovi.roma.it',
    port: 80,
    path: '/ws/xml/autenticazione/1',
  });
  client.methodCall('autenticazione.Accedi', [data.toString(), 'marco93'], function(error, value) {
    cb(value);
  });
});
}

module.exports = {
  getTempiPaletta: function(cb) {
  var client = xmlrpc.createClient({
    host: 'muovi.roma.it',
    port: 80,
    path: '/ws/xml/paline/7'
  });
  var palina = arguments[1];
  var tokenAtac = autenticazioneAtac(function(tokenAtac) {
  client.methodCall('paline.Previsioni', [tokenAtac, palina, 'IT'], function(error, value) {
    	cb(value);
    });
    })
  },
  getCapolinea: function(cb) {
  var client = xmlrpc.createClient({
    host: 'muovi.roma.it',
    port: 80,
    path: '/ws/xml/paline/7'
  });
  var ricerca = arguments[1];
  var tokenAtac = autenticazioneAtac(function(tokenAtac) {
    client.methodCall('paline.SmartSearch', [tokenAtac, ricerca], function(error, value) {
      cb(value);
    });
    })
  },
  getFermate: function(cb) {
  var client = xmlrpc.createClient({
    host: 'muovi.roma.it',
    port: 80,
    path: '/ws/xml/paline/7'
  });
  var ricerca = arguments[1];
  var tokenAtac = autenticazioneAtac(function(tokenAtac) {
    client.methodCall('paline.Fermate', [tokenAtac, ricerca, 'IT'], function(error, value) {
      cb(value);
    });
    })    
  }
};