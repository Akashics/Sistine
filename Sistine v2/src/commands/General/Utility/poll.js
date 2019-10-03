const { Command } = require('klasa');
const { post } = require("snekfetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            cooldown: 10,
            aliases: ["strawpoll", "createpoll"],
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_POLL_DESCRIPTION"),
            usage: "<Question:string> <Options:string> [...]",
            usageDelim: "|",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [Question, ...Options]) {
        if (Options.length < 2) return msg.sendMessage("? Please provide atleast 2 options for me to poll with.");
        if (Options.length > 30) return msg.sendMessage("? Are you trying to break me? Please provide less than 30 options to create a poll");
        try {
            const { body } = await post("https://www.strawpoll.me/api/v2/polls")
                .send({ title: Question, options: Options })
                .catch(e => {
                    Error.captureStackTrace(e);
                    return e;
                });
            return msg.sendMessage(`? Here's the poll you requested: https://www.strawpoll.me/${body.id}`);
        } catch (e) {
            return msg.sendMessage("? Strawpoll encountered an error trying to create this poll, please try again.");
        }
    }

};