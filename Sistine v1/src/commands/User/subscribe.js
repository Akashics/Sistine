const { Command } = require('klasa');
const announcement = require('../../lib/util/announcement');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'subscribe',
			permissionLevel: 0,
			runIn: ['text'],

			description: 'Subscribe to this servers\' announcements.'
		});
	}

	async run(msg) {
		const role = announcement(msg);
		await msg.member.roles.add(role, 'Subscribed to Announcements');
		return msg.send(msg.language.get('COMMAND_SUBSCRIBE_SUCCESS', role.name));
	}

};
