const { Task, Duration } = require('klasa');

module.exports = class Reminder extends Task {

	async run({ user, text, from }) {
		const _users = this.client.users.fetch(user.id);
		return _users.send(`:wave: Hey **${user.username}**, you asked me to remind you to \`${text}\` ${Duration.toNow(from)} ago.`);
	}

};
