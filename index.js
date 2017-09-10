/*
 * Before everything you must be sure that you set a proper token for
 * your bot in the 'config.js'
 * Otherwise, please adjust ~botToken~ accordingly.
 */
const botToken = require('./config.js').token
const telegraf = require('telegraf')
const { Extra, Markup } = require('telegraf')
const bot = new telegraf(botToken)
const botController = require('./libs/botController')

const curricula = require('./data/curricula.json')

bot.use(telegraf.log())

bot.command('/start', ({ reply }) => {
    return reply('Having a library at hand, I would be glad to pick-and-choose\n' +
                 'all the neccessary resources for the courses you like.\n\n' +
                 'Would you be so kind to specify the year of study?',
                 Extra.HTML().markup(
                     (m) => m.inlineKeyboard([
                         m.callbackButton('Year 1', 'Year 1'),
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

bot.command('/1', (ctx) => {
    botController.botHandler(bot, ctx, 'Year 1')})
bot.command('/2', (ctx) => {
    botController.botHandler(bot, ctx, 'Year 2')})
bot.command('/3', (ctx) => {
    botController.botHandler(bot, ctx, 'Year 3')})
bot.command('/4', (ctx) => {
    botController.botHandler(bot, ctx, 'Year 4')})

bot.command('/help', (ctx) => {
    return ctx.replyWithHTML('Greetings, ' + ctx.from.first_name + '!\n\n' +
                             'My name is Alfred, and I am an aide-de-camp of ' +
                             '<a href="https://www.hse.ru/ba/ami/">CS.HSE AMI</a>.\n' +
                             'Very pleased to meet you!\n\n' +
                             'My <b>primary mission</b> for now is to collect and organise\n' +
                             'educational materials to save your time and make\n'+
                             'the business of making the world better a tiny bit easier.\n\n' +
                             'Would you like to /start looking at how I can help you?')})

// bot.startPolling()

// WebHook method

bot.telegram.setWebhook('https://api.telegram.org/bot${botToken}/secret-path')
bot.startWebhook('/secret-path', null, 443)

