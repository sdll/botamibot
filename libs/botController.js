const telegraf = require('telegraf')
const { Extra, Markup } = require('telegraf')

module.exports = class Botamibot{
    static subjectKeyboard(m, subjectTitles) {
        var buttons = []
        for (var i = 0;
             i < subjectTitles.length;
             i++) {
            var subject = subjectTitles[i]
            buttons.push(m.callbackButton(subject,
                                          subject))}
        return m.inlineKeyboard(buttons).resize()
    }


    static subjectHandler(ctx, year, subjectTitle, subject) {
        const materials_ids = Object.keys(subject)
        var materials = "<b>Reading List" + " for " +
            subjectTitle + ", " + year + "</b>:\n\n"
        for (var j = 0; j < materials_ids.length; j++) {
            var material_id = materials_ids[j]
            var material = subject[material_id]
            materials += material_id + "." +
                "<i>" + material.authors + "</i>\n" +
                "<a " + "href=\"" + material.link + "\">    " +
                material.title + "</a>\n\n"
        }
        return ctx.editMessageText(materials, {parse_mode: "html"})
    }

    static setupSubjectActions(bot, ctx, year, subjects) {
        var subjectTitles = Object.keys(subjects)
        for (var i = 0; i < subjectTitles.length; i++) {
            (function(i) {var subjectTitle = subjectTitles[i] 
                          bot.action(subjectTitle, (ctx) => {
                              Botamibot.subjectHandler(ctx,
                                                       year,
                                                       subjectTitle,
                                                       subjects[subjectTitle])
                          })
                         })(i);
        }
    }

    static yearHandler(bot, ctx, curricula, year) {
        const subjects = curricula[year]
        const subjectTitles = Object.keys(subjects)

        ctx.replyWithHTML("Thank you very much! Much easier now.\n" +
                          "Please push on the course title to see related materials on the topic.",
                          Extra.HTML().markup(
                              (m) => this.subjectKeyboard(m, subjectTitles)
                          )
                         )
        Botamibot.setupSubjectActions(bot, ctx, year, subjects)
        return 0
    }


    static botHandler(bot, ctx, year) {
        const curricula = require('../data/curricula.json')
        if ( typeof curricula[year] !== 'undefined' && curricula[year] )
        {
            this.yearHandler(bot, ctx, curricula, year)
        }
        else
        {
            ctx.replyWithHTML("What an abominable state of affairs!\n" +
                              "I am sorry, but I cannot help you with this query.\n" +
                              "At least we can say for sure that I am still not resourceful enough.\n\n"+
                              "Could you please send what you are missing to my " +
                              "<a href='https://t.me/sashill'>buddy</a> in order to fix the issue?")
        }
        return 0
    }
}
