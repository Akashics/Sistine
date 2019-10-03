const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	
    constructor(...args) {
        super(...args, {
            aliases: ["patreon", "patron"],
            guarded: true,
            requiredPermissions: ["EMBED_LINKS", "ATTACH_IMAGES"],
            description: language => language.get("COMMAND_DONATE_DESCRIPTION")
        });
    }

    async run(msg) {
        const embed = new MessageEmbed()
            .setDescription(msg.language.get("COMMAND_DONATE"))
            .setAuthor("Donate and Support Senko-san", this.client.user.displayAvatarURL(), "https://Senko-san.moe")
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor("RANDOM");
        return msg.sendEmbed(embed);
    }

};