const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            guarded: true,
            requiredPermissions: ["EMBED_LINKS", "ATTACH_IMAGES"],
            description: language => language.get("COMMAND_UPVOTE_DESCRIPTION")
        });
    }

    async run(msg) {
        const embed = new MessageEmbed()
            .setDescription(msg.language.get("COMMAND_UPVOTE"))
            .setAuthor("Upvote Senko-san", this.client.user.displayAvatarURL(), `https://discordbots.org/bot/${this.client.user.id}/vote`)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor("RANDOM");
        return msg.sendEmbed(embed);
    }
}