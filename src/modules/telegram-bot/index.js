var NodeTelegramBotAPI = require('node-telegram-bot-api');
var fs = require('fs')
var path = require('path');
var filePath = path.join(__dirname, 'telegramToken.txt');
var token = fs.readFileSync(filePath, 'utf8');
module.exports = new NodeTelegramBotAPI(token, {polling: true});
