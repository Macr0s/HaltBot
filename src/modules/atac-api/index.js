/**
 * TODO: Questa dovrebbe diventare una classe strutturata, che offra metodi del tipo:
 * getTempiPaletta(paletta)
 * getTempiLinea(linea)
 */
var bot = require('../telegram-bot/index');
var xmlrpc = require('xmlrpc');
var codice = null;
var config = require('./config.js');

var clientAutenticazione = xmlrpc.createClient({
  host: 'muovi.roma.it',
  port: 80,
  path: '/ws/xml/autenticazione/1',
});

var client = xmlrpc.createClient({
  host: 'muovi.roma.it',
  port: 80,
  path: '/ws/xml/paline/7'
});

function autenticazioneAtac(cb) {
  var token = config.atacToken;
  clientAutenticazione.methodCall('autenticazione.Accedi', [token, 'marco93'], function(error, value) {
    codice = value;
    cb(value);
  });
}

module.exports = {
  getTempiPaletta: function(cb) {
  var palina = arguments[1];
  client.methodCall('paline.Previsioni', [codice, palina, 'IT'], function(error, value) {
    if(error && error.code == 824) {
      var tokenAtac = autenticazioneAtac(function(tokenAtac) {
        client.methodCall('paline.Previsioni', [tokenAtac, palina, 'IT'], function(error, value) {
            cb(value);
        });
      })
    }
    else {
      cb(value);
    }
  });
  },
  getCapolinea: function(cb) {
  var ricerca = arguments[1];
  client.methodCall('paline.SmartSearch', [codice, ricerca], function(error, value) {
    if(error && error.code == 824) {
      var tokenAtac = autenticazioneAtac(function(tokenAtac) {
        client.methodCall('paline.SmartSearch', [tokenAtac, ricerca], function(error, value) {
            cb(value);
        });
      })
    }
    else {
      cb(value);
    }
  });
  },
  getFermate: function(cb) {
  var ricerca = arguments[1];
  client.methodCall('paline.Fermate', [codice, ricerca, 'IT'], function(error, value) {
    if(error && error.code == 824) {
      var tokenAtac = autenticazioneAtac(function(tokenAtac) {
        client.methodCall('paline.Fermate', [tokenAtac, ricerca, 'IT'], function(error, value) {
            cb(value);
        });
      })
    }
    else {
      cb(value);
    }
  });
  }
}