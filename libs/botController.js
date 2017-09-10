const telegraf = require('telegraf')
const { Extra, Markup } = require('telegraf')

module.exports = class {
    static yearHandler(ctx, curricula, year) {
        const subjects = curricula[year]
        ctx.replyWithHTML("<i>Course</i> :",
                          Extra.markup(Markup
                                       .keyboard(Object.keys(subjects))
                                       .oneTime()
                                       .resize()
                                      )
        )
        return subjects
    }

    static subjectHandler(bot, ctx, subjects) {
        var subject_names = Object.keys(subjects)

        for (var i = 0; i < subject_names.length; i++) {
            var subject = subjects[subject_names[i]]
            bot.hears(subject_names[i], (ctx) => {
                const materials_ids = Object.keys(subject)
                var materials = "<b>Reading List</b>:\n\n"
                for (var j = 0; j < materials_ids.length; j++) {
                    var material_id = materials_ids[j]
                    var material = subject[material_id]
                    materials += material_id + "." +
                        "<i>" + material.authors + "</i>\n" +
                        "<a " + "href=\"" + material.link + "\">    " +
                        material.title + "</a>\n\n"
                }
                return ctx.replyWithHTML(materials)
            })
        }
    }

    static botHandler(bot, ctx, year) {
        const curricula = require('../data/curricula.json')
        if ( typeof curricula[year] !== 'undefined' && curricula[year] )
        {
            this.subjectHandler(bot, ctx, this.yearHandler(ctx, curricula, year))
        }
        else
        {
            ctx.reply("Sorry, no subjects are listed for the chosen year of study!")
        }
        return 0
    }
}
