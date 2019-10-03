const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: [],
            aliases: ["nodesinfo"],
            cooldown: 5,
            description: "",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg) {

        const embed = new MessageEmbed()
            .setAuthor('Voice Node Information, this.client.user.displayAvatarURL(), "https://Senko-san.moe")
            .setTimestamp()
        for (const node of this.client.lavalink.nodes.values()) {
            embed.addField(node.region, `**Players:** ${node.stats.playingPlayers} / ${node.stats.players}
**Memory:** ${(node.stats.memory.used / 1024 / 1024).toFixed(2)} / ${(node.stats.memory.allocated / 1024 / 1024).toFixed(2)}
**CPU:** ${node.stats.cpu.systemLoad.toFixed(2)}`, true);
        }
        return msg.sendEmbed(embed);
    }

};