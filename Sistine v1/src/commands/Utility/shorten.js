const { Command } = require('klasa');
const snekie = require('snekfetch');

module.exports = class ShortenCommand extends Command {

	constructor(...args) {
		super(...args, {
			cooldown: 60,
			aliases: ['short', 'goo.gl', 'shortner'],
			description: 'Shorten any url with goo.gl.',
			usage: '<URL:url>'
		});
	}

	async run(msg, [url]) {
		const mess = await msg.send(`Generating a goo.gl short url...`);
		const newurl = await this.genLink(url);
		return mess.edit(`${msg.author.username}, heres your new url: ${newurl}`);
	}

	async genLink(url) {
		const { body } = await snekie.post(`https://www.googleapis.com/urlshortener/v1/url`).send({ longUrl: url }).query({ key: this.client.settings.apiToken.googleapi });
		return body.id;
	}

};
