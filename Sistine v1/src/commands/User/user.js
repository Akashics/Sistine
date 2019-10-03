const { Command, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class User extends Command {

	constructor(...args) {
		super(...args, {
			description: (msg) => msg.language.get('COMMAND_USER_DESCRIPTION'),
			usage: '[Member:member]'
		});
		this.statuses = {
			online: '💚 Online',
			idle: '💛 Idle',
			dnd: '❤ Do Not Disturb',
			offline: '💔 Offline'
		};
		this.timestamp = new Timestamp('d MMMM YYYY');
	}

	async run(msg, [member = msg.member]) {
		const userInfo = new MessageEmbed()
			.setColor(member.displayHexColor ? member.displayHexColor : '0xFFFFFF')
			.setThumbnail(member.user.displayAvatarURL())
			.addField('❯ Name', member.user.tag, true)
			.addField('❯ ID', member.id, true)
			.addField('❯ Discord Join Date', this.timestamp.display(member.user.createdAt), true)
			.addField('❯ Server Join Date', this.timestamp.display(member.joinedTimestamp), true)
			.addField('❯ Status', this.statuses[member.user.presence.status], true)
			.addField('❯ Playing', member.user.presence.activity ? member.user.presence.activity.name : 'N/A', true)
			.addField('❯ Highest Role', member.roles.highest !== '@everyone' ? member.roles.highest.name : 'None', true)
			.addField('❯ Hoist Role', member.roles.hoist ? member.roles.hoist.name : 'None', true);

		return msg.sendEmbed(userInfo);
	}

};
