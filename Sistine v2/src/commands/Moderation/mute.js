/* eslint-disable no-unused-expressions */
const { Command, Duration } = require("klasa");
const ModLog = require('../../library/Util/ModLog');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 8,
            aliases: ["togglemute", "unmute"],
            permissionLevel: 3,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            description: language => language.get("COMMAND_MUTE_DESCRPTION"),
            usage: "<member:membername> [reason:string] [...]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member, ...reason]) {
        reason = reason ? reason.join(" ") : null;

        if (member.id === msg.author.id) return msg.reply(`✗ SILENCE YOU. There. You've been muted.`);
        if (member.id === this.client.user.id) return msg.reply(`✗ If you do not want me to send messages, remove the SEND_MESSAGES permission.`);

        const roleID = msg.guild.settings.roles.muted;
        if (!roleID || !msg.guild.roles.has(roleID)) await this.createRole(msg);

        const role = await msg.guild.roles.fetch(msg.guild.settings.roles.muted).catch(() => null);
        if (!role) return msg.sendMessage("Could not fetch mute role. Either it does not exist, or Discord can't find it.");

        const myRole = msg.guild.me.roles.highest;
        if (role.position > myRole.positon) return msg.sendMessage(`✗ Your muted role provides a higher hierarchy than what Senko-san can moderate. Please move Senko-san's role as high as it can go.`);

        const time = msg.flags.time || msg.flags.duration || msg.flags.tempmute;
        let duration = null;
        time ? duration = new Duration(time) : null;
        if (time && (duration.offset < 1 || duration.offset > 2592000000)) throw `✗ Duration is invalid. Try specifying "1 day" or "1 hour" or "21 days" (Maximum 30 days)`;

        if (member.roles.has(role.id)) {
            await member.roles.remove(role)
                .catch(e => msg.reply(`✗ Whoops! ${e}`));

            if (msg.guild.settings.channels.modlogs) {
                await new ModLog(msg.guild)
                    .setType("unmute")
                    .setModerator(msg.author)
                    .setReason(reason)
                    .setUser(member.user)
                    .send();
            }

            return msg.sendMessage(`✓ ${member.user.tag} has been unmuted.`);
        } else {
            await member.roles.add(role)
                .catch(e => msg.reply(`✗ Whoopsie! ${e}`));

            if (msg.guild.settings.channels.modlogs) {
                await new ModLog(msg.guild)
                    .setType("mute")
                    .setModerator(msg.author)
                    .setReason(reason)
                    .setUser(member.user)
                    .send();
            }

            if (time) await this.client.schedule.create("timedMute", new Duration(time), { data: { guildID: msg.guild.id, userID: member.id }, catchUp: true });
            return msg.sendMessage(`✓ ${member.user.tag} has been muted. ${time ? `Temporarily Muted for ${time}` : "Forever"}.`);
        }
    }

    async createRole(msg) {
        if (!msg.guild.me.permissions.has("MANAGE_ROLES")) return msg.sendMessage(`✗ I need permission to **Manage Roles** to create this role. Grant me this permission then try again.`);

        const newRole = await msg.guild.roles.create({
            data: {
                name: "Senko-sanMute",
                permissions: ["READ_MESSAGES"]
            }
        }).catch(e => msg.reply(`There was an error: ${e}`));

        const { errors } = await msg.guild.settings.update("roles.muted", newRole.id);
        if (errors.length) return msg.sendMessage(`✗ Woah, what? ${errors[0]}`);

        const promises = [];
        for (const channel of msg.guild.channels.values()) promises.push(channel.updateOverwrite(newRole, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false }, `Mute Command Executed By ${msg.author.tag}`));
        await Promise.all(promises);
    }

};