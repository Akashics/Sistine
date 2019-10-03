const { Command, Duration } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'creates a reminder',
			usage: '<when:time> <text:str> [...]',
			usageDelim: ' '
		});
	}

	async run(msg, [when, ...text]) {
		const reminderText = text.join(' ');
		const time = Duration.toNow(when);
		await this.client.schedule.create('reminder', when, {
			data: {
				user: { id: msg.author.id, name: msg.author.username },
				text: reminderText,
				from: Date.now()
			}
		});
		return msg.send(`<:blobthumbsup:357267430105677844> I will remind you in ${time} to ${reminderText}.`);
	}

};
