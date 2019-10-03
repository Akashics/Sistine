const { Command, Util, } = require("../../index");
const { Command, Duration } = require("klasa");
const ModLog = require('../../library/Util/ModLog');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            permissionLevel: 3,
            runIn: ["text"],
            description: language => language.get("COMMAND_REASON_DESCRIPTION"),
            usage: "<selected:integer> [reason:string] [...]",
            usageDelim: " "
        });
    }

    async run(msg, [selected, ...reason]) {
        reason = reason ? reason.join(" ") : null;

        const logs = msg.guild.settings.modlogs;
        const log = logs[selected];
        if (!log) return msg.sendMessage(`✗ The case number **${selected}** does not exist.`);

        if (!msg.guild.settings.channels.modlogs) return msg.sendMessage(`✗ There are no appropriate channels to send moderator logs to. You can set one up using this command: \`${msg.guildSettings.prefix}modlogs channel <channel>\``);
        const channel = msg.guild.channels.get(msg.guild.settings.channels.modlogs);
        if (!channel) return msg.sendMessage(`✗ There are no appropriate channels to send moderator logs to. You can set one up using this command: \`${msg.guildSettings.prefix}modlogs channel <channel>\``);

        const mod = await this.client.users.fetch(log.moderator);
        const muser = await this.client.users.fetch(log.user);

        const messages = await channel.messages.fetch({ limit: 100 });
        const message = messages.find(mes => mes.author.id === this.client.user.id &&
            mes.embeds.length > 0 &&
            mes.embeds[0].type === "rich" &&
            mes.embeds[0].footer && mes.embeds[0].footer.text === `Case: ${selected}`
        );

        if (message) {
            const [embed] = message.embeds;
            const [type, user] = embed.description.split("\n");
            embed.description = [
                type,
                user,
                `**⮞ Reason**: ${reason}`
            ].join("\n");
            await message.edit({ embed });
        } else {
            const embed = new MessageEmbed()
                .setAuthor(mod.tag)
                .setColor(ModLog.color(log.type))
                .setDescription([
                    `**⮞ Type**: ${log.type[0].toUpperCase() + log.type.slice(1)}`,
                    `**⮞ User**: ${muser.tag} (${muser.id})`,
                    `**⮞ Reason**: ${reason}`
                ].join("\n"))
                .setFooter(`Case: ${selected}`)
                .setTimestamp();
            await channel.send({ embed });
        }

        const oldReason = log.reason;

        logs[selected].reason = reason;
        await msg.guild.settings.update("modlogs", logs);

        return msg.send(`${this.client.emotes.check} Case ${selected} has been updated.${Util.codeBlock("http", [
            `Old reason : ${oldReason || "No Reason Specified."}`,
            `New reason : ${reason}`
        ].join("\n"))}`);
    }

};