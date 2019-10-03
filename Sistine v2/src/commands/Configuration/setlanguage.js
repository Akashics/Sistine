const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            guarded: true,
            hidden: true,
            aliases: ["language", "selectlanguage"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_SETLANGUAGE_DESCRPTION"),
            usage: "[language:string]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [language]) {
        if (!language) return msg.sendMessage(msg.language.get("HELP_SET_LANGUAGE"));

        const currLang = msg.guild.settings.language;
        if (/english|inglese|en|en-us/i.test(language)) {
            if (currLang === "en-US") throw `? ***${msg.language.get("ER_CURR_LANG")}***`;
            await this.changeLanguage(msg, "en-US");
        } else if (/italian|italiano|it|it-it/i.test(language)) {
            if (currLang === "it-IT") throw `?***${msg.language.get("ER_CURR_LANG")}***`;
            await this.changeLanguage(msg, "it-IT");
        } else if (/spanish|espa�ol|espanol|es|es-es/i.test(language)) {
            if (currLang === "es-ES") throw `? ***${msg.language.get("ER_CURR_LANG")}***`;
            await this.changeLanguage(msg, "es-ES");
        } else if (/fran�ais|french|francais|fr|fr-fr/i.test(language)) {
            if (currLang === "fr-FR") throw `? ***${msg.language.get("ER_CURR_LANG")}***`;
            await this.changeLanguage(msg, "fr-FR");
        } else if (/sardinian|sard|sardu|sar|sar-IT/i.test(language)) {
            if (currLang === "fr-FR") throw `? ***${msg.language.get("ER_CURR_LANG")}***`;
            await this.changeLanguage(msg, "fr-FR");
        } else {
            throw `? ***${msg.language.get("ER_NO_LANG")}***`;
        }
    }

    async changeLanguage(msg, language) {
        await msg.guild.settings.update("language", language);
        return msg.sendMessage(`? \`${language}\` ***${msg.language.get("CONF_LANG_SET")}***`);
    }

};