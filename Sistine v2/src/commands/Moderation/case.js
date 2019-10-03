const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ["USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            permissionLevel: 3,
            runIn: ["text"],
            description: language => language.get("COMMAND_CASE_DESCRIPTION"),
            usage: "<case:integer>"
        });
    }

    async run(msg, [selected]) {
        const log = msg.guild.settings.modlogs[selected];
        if (!log) return msg.send(`✗ Case ${selected} cannot be found.`);

        const [user, moderator] = await Promise.all([
            this.client.users.fetch(log.user),
            this.client.users.fetch(log.moderator)
        ]);

        return msg.sendEmbed(new MessageEmbed()
            .setDescription([
                `⮞ **User**: ${user.tag} (${user.id})`,
                `⮞ **Moderator**: ${moderator.tag} (${moderator.id})`,
                `⮞ **Reason**: ${log.reason || `No Reason Specified. Use \`${msg.guild.settings.prefix}reason ${log.case}\` to claim this log.`}`
            ].join("\n"))
            .setTimestamp(log.timestamp)
            .setFooter("Case Date")
            .setAuthor(`Case: ${log.case}`, this.client.user.displayAvatarURL())
            .setColor("#52c6ff"));
    }

};