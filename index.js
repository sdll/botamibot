/*
 * Before everything you must be sure that you set a proper token for
 * your bot in the 'config.js'
 * Otherwise, please adjust ~botToken~ accordingly.
 */
const botToken = require('./config').token
const telegraf = require('telegraf')
const { Extra, Markup } = require('telegraf')
const bot = new telegraf(botToken)
const botController = require('./libs/botController')

const curricula = require('./data/curricula.json')

bot.use(telegraf.log())

bot.command('/start', ({ reply }) => {
    return reply('Please choose the year of study:', Extra.HTML().markup(
        (m) => m.inlineKeyboard([m.callbackButton('Year 1', 'Year 1'),
                                 m.callbackButton('Year 2', 'Year 2'),
                                 m.callbackButton('Year 3', 'Year 3'),
                                 m.callbackButton('Year 4', 'Year 4')])))})
bot.action('Year 1', (ctx) => {
    botController.botHandler(bot, ctx, 'Year 1')
})
bot.action('Year 2', (ctx) => {
    botController.botHandler(bot, ctx, 'Year 2')
})
bot.action('Year 3', (ctx) => {
    botController.botHandler(bot, ctx, 'Year 3')
})
bot.action('Year 4', (ctx) => {
    botController.botHandler(bot, ctx, 'Year 4')
})

bot.startPolling()
