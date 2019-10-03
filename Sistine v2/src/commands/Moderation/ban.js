/* eslint-disable no-unused-expressions */
const { Command, Duration } = require("klasa");
const ModLog = require('../../library/Util/ModLog');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["banmember"],
            permissionLevel: 5,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "BAN_MEMBERS"],
            description: language => language.get("COMMAND_BAN_DESCRIPTION"),
            quotedStringSupport: false,
            usage: "<user:username> [reason:string] [...]",
            usageDelim: " ",
            extendedHelp: "`--duration <1d-14d>` to Temporary Ban a User\n`--messages <1-7>` for days of messages to delete"
        });
    }

    // eslint-disable-next-line complexity
    async run(msg, [user, ...reason]) {
        reason = reason ? reason.join(" ") : null;

        if (user.id === msg.author.id) return msg.reply(`✗ No, I won't ban you.`);
        if (user.id === this.client.user.id) return msg.reply(`✗ If you want me to leave, then just remove me from this guild.`);

        let target = await msg.guild.members.fetch(user.id).catch(() => null);

        if (target) {
            if (target.roles.highest.position >= msg.member.roles.highest.position) return msg.reply(`✗ Target user has a higher privilage then you.`);
            else if (!target.bannable) return msg.reply(`✗ Target user is not punishable.`);
        } else {
            target = user;
        }

        let msgDays = msg.flags.messages || msg.flags.msg;
        msgDays = Number(msgDays);
        const banDays = msg.flags.duration || msg.flags.tempban || msg.flags.time || null;
        let duration;
        banDays ? duration = new Duration(banDays) : null;

        if (msgDays && (!typeof msgDays === Number || msgDays < 1 || msgDays >= 8)) throw `✗ Invalid count of days to delete messages. Valid counts are 1-7.`;
        if (banDays && (duration.offset < 1 || duration.offset > 2592000000)) throw `✗ Users can only be banned temporily for a maximum of 30 days.`;

        await msg.guild.members.ban(target, { reason: reason ? reason : `No Reason Specified - ${msg.author.tag}`, days: msgDays });

        if (msg.guild.settings.channels.modlogs) {
            await new ModLog(msg.guild)
                .setType("ban")
                .setModerator(msg.author)
                .setReason(reason)
                .setUser(user)
                .send();
        }

        if (banDays) await this.client.schedule.create("timedBan", duration, { data: { guildID: msg.guild.id, userID: user.id }, catchUp: true });

        return msg.sendMessage(`${this.client.emotes.check} ***${user.tag ? user.tag : user.user.tag} ${msg.language.get("MESSAGE_BANNED")}${duration > 0 ? ` Temp Ban for: ${banDays}` : ""}***`);
    }

};