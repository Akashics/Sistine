const { Command } = require("klasa");
const ModLog = require('../../library/Util/ModLog');


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["kickmember"],
            permissionLevel: 5,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "KICK_MEMBERS"],
            description: language => language.get("COMMAND_KICK_DESCRIPTION"),
            quotedStringSupport: false,
            usage: "<member:membername> [reason:string] [...]",
            usageDelim: " ",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member, ...reason]) {
        reason = reason ? reason.join(" ") : ' No Reason Specified';

        if (member.id === msg.author.id) return msg.reply(`✗ I don't even understand why you would want to do this.`);
        if (member.id === this.client.user.id) return msg.reply(`✗ If you don't want me to be here, just remove me from the guild.`);

        if (member.roles.highest.position >= msg.member.roles.highest.position) {
            return msg.send(`✗ * Target user has a higher privilage then you.`);
        } else if (member.kickable === false) {
            return msg.send(`✗ Target user is unable to be kicked.`);
        }

        await member.kick(reason)
            .catch(e => msg.reply(`✗ An error occured. ${e}`));

        if (msg.guild.settings.channels.modlogs) {
            await new ModLog(msg.guild)
                .setType("kick")
                .setModerator(msg.author)
                .setUser(member.user)
                .setReason(reason)
                .send();
        }


        return msg.sendMessage(`✓ ${member.user.tag} has been kicked for ${reason}.`);
    }

};