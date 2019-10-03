const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            cooldown: 5,
            aliases: ["letmegoogleitforyou", "google"],
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_LMGTFY_DESCRIPTION"),
            usage: "<query:string>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [query]) {
        return msg.sendMessage(`? Here. Let me google that for you... <http://lmgtfy.com/?q=${query.replace(/ /g, "+")}>`);
    }

};