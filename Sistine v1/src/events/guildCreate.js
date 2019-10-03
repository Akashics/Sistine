const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class guildCreate extends Event {

	constructor(...args) {
		super(...args, { name: 'guildCreate', enabled: true });
	}

	async run(guild) {
		if (!guild || !guild.available) return;
		const embed = new MessageEmbed()
			.setAuthor(guild.owner.user.tag, guild.owner.user.displayAvatarURL())
			.setColor('GREEN')
			.setTitle('Joined Guild')
			.setFooter(`Shard ${this.client.shard.id} is now at ${this.client.guilds.size} guilds.`)
			.setTimestamp()
			.setDescription(`${guild.name} (${guild.id})`)
			.setThumbnail(guild.iconURL());
		return this.client.joinlog.send('', { embed });
	}

};
