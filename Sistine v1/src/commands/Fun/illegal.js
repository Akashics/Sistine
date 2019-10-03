const { Command } = require('klasa');
const { get, post } = require('snekfetch');
const inUse = new Map();

module.exports = class IsNowIllegal extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['sign'],
			description: (msg) => msg.language.get('COMMAND_ILLEGAL_DESCRIPTION'),
			usage: '<Thing:string>',
			cooldown: 15
		});
	}
	/* eslint-disable max-len, arrow-body-style */
	async run(msg, [thing]) {
		if (inUse.get('true')) throw msg.language.get('COMMAND_ILLEGAL_INUSE');
		inUse.set('true', { user: msg.author.id });
		const wordMatch = /^[a-zA-Z\s]{1,10}$/.exec(thing);
		if (thing.length < 1 || thing.length > 10) {
			inUse.delete('true');
			throw msg.language.get('COMMAND_ILLEGAL_ERROR');
		}
		if (!wordMatch) {
			inUse.delete('true');
			throw msg.language.get('COMMAND_ILLEGAL_SYNTAX', msg.author.username);
		}
		try {
			const message = await msg.send(`<a:loading:402288838187417601> ${msg.language.get('COMMAND_ILLEGAL_CONVINCE', thing.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }))}`);
			await post('https://is-now-illegal.firebaseio.com/queue/tasks.json').send({ task: 'gif', word: thing.toUpperCase() });
			await this.client.wait(6000);
			const result = await get(`https://is-now-illegal.firebaseio.com/gifs/${thing.toUpperCase()}.json`);
			if (!result.body.url) return msg.send('API did not send a valid request. Try again in a few moments.');
			await msg.send({ files: [result.body.url] });
			inUse.delete('true');
			return message.delete();
		} catch (error) {
			inUse.delete('true');
			throw error;
		}
	}

};
