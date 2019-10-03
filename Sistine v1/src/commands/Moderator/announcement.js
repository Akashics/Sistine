const { Command } = require('klasa');
const announcement = require('../../lib/util/announcement');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'announcement',
			aliases: ['announce'],
			permissionLevel: 4,
			runIn: ['text'],

			description: (msg) => msg.language.get('COMMAND_ANNOUNCEMENT_DESCRIPTION'),
			usage: '<string:string>',
			cooldown: 60
		});
	}

	async run(msg, [message]) {
		const announcementID = msg.guild.configs.announcementChannel;
		if (!announcementID) throw msg.language.get('COMMAND_SUBSCRIBE_NO_CHANNEL');
		const channel = msg.guild.channels.get(announcementID);
		if (!channel) throw msg.language.get('COMMAND_SUBSCRIBE_NO_CHANNEL');
		if (channel.postable === false) throw msg.language.get('SYSTEM_CHANNEL_NOT_POSTABLE');
		const role = announcement(msg);
		await role.edit({ mentionable: true });
		await channel.send(`${msg.language.get('COMMAND_ANNOUNCEMENT', role)}\n${message}`);
		await role.edit({ mentionable: false });
		return msg.send(msg.language.get('COMMAND_SUCCESS'));
	}

};
