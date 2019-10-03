const { Command } = require('klasa');
const announcement = require('../../lib/util/announcement');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'unsubscribe',
			permissionLevel: 0,
			runIn: ['text'],

			description: (msg) => msg.language.get('COMMAND_UNSUBSCRIBE_DESCRIPTION')
		});
	}

	async run(msg) {
		const role = announcement(msg);
		await msg.member.roles.remove(role, 'Unsubscribed from Announcements');
		return msg.send(msg.language.get('COMMAND_UNSUBSCRIBE_SUCCESS', role.name));
	}

};
