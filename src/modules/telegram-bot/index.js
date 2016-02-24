var NodeTelegramBotAPI = require('node-telegram-bot-api');
var config = require('../../config.js');
var token = config.telegramToken;
module.exports = new NodeTelegramBotAPI(token, {polling: true});
