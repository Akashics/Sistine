const { Command } = require("klasa");
const ModLog = require('../../library/Util/ModLog');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            permissionLevel: 3,
            runIn: ["text"],
            description: language => language.get("COMMAND_WARN_DESCRIPTION"),
            usage: "<member:membername> [reason:string] [...]",
            usageDelim: " "
        });
    }

    async run(msg, [member, ...reason]) {
        reason = reason ? reason.join(" ") : null;

        if (member.roles.highest.position >= msg.member.roles.highest.position) {
            return msg.sendMessage(`${this.client.emotes.cross} ***Target member is higher in role hierarchy than you.***`);
        }

        if (msg.guild.settings.channels.modlogs) {
            await new ModLog(msg.guild)
                .setType("warn")
                .setModerator(msg.author)
                .setUser(member.user)
                .setReason(reason)
                .send();
        }

        await member.user.sendCode("http", [
            `You've been warned in ${msg.guild.name}`,
            `Reason : ${reason ? reason : "No Reason Specified"}`
        ].join("\n")).catch(() => null);

        return msg.sendMessage(`${this.client.emotes.check} ***This user has been sucessfully warned:*** ${member.user.tag}${reason ? `\n***Reason:*** ${reason}` : ""}`);
    }

};