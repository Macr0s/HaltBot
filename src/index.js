var xmlrpc = require('xmlrpc');
var bot = require('./modules/telegram-bot');
var comandoStart = require('./command/comandoStart');
var comandoHelp = require('./command/comandoHelp');
var comandoInfoFermata = require('./command/comandoInfoFermata');
var comandoInfoLinea = require('./command/comandoInfoLinea');
var previsionePaletta = require('./command/previsionePaletta');
var previsioneLinea = require('./command/previsioneLinea');
var comandoPreferiti = require('./command/comandoPreferiti');

bot.onText(/^\/start$/, comandoStart);

bot.onText(/^\/numero_fermata$/, comandoInfoFermata);

bot.onText(/^\/numero_linea$/, comandoInfoLinea);

bot.onText(/^\/[0-9]{1,3}$|^\/[0-9]{1,3}[F,B,P,L,D,d,f,b,p,l]$|^\/[c,C][0-9]{1,2}$|^\/[N,n]2[L,l]$|^\/[N,n]2[P,p]$|^\/[N,n][0-9]{1,2}$|^\/[H,h]$/, previsioneLinea.previsioneLinea);

bot.onText(/^\/[0-9]{5}$/, previsionePaletta);

bot.onText(/^[0-9]{1,5} - /, previsioneLinea.getFermate);

bot.onText(/^\/help$/, comandoHelp);

bot.onText(/^\/preferiti$/, comandoPreferiti.comandoPreferiti);

bot.onText(/^\/add[0-9]{1,5}$/, comandoPreferiti.addPreferito);

bot.onText(/^\/remove[0-9]{1,5}$/, comandoPreferiti.removePreferito);

