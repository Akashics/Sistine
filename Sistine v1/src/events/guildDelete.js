const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class guildDelete extends Event {

	constructor(...args) {
		super(...args, { name: 'guildDelete', enabled: true });
	}

	run(guild) {
		if (!guild || !guild.available) return;
		const embed = new MessageEmbed()
			.setAuthor(guild.owner.user.tag, guild.owner.user.displayAvatarURL())
			.setColor('RED')
			.setTitle('Left Guild')
			.setFooter(`Shard ${this.client.shard.id} is now at ${this.client.guilds.size} guilds.`)
			.setTimestamp()
			.setDescription(`${guild.name} (${guild.id})`)
			.setThumbnail(guild.iconURL());
		return this.client.joinlog.send('', { embed });
	}

};
