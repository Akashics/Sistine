const { Command } = require('klasa');
const snekfetch = require('snekfetch');

module.exports = class Clyde extends Command {

	constructor(...args) {
		super(...args, {
			requiredPermissions: ['SEND_MESSAGES', 'MANAGE_WEBHOOKS'],
			description: 'It seems that Clyde has something to say.',
			usage: '<text:string{1,100}>'
		});
	}

	async run(msg, [content]) {
		const image = await snekfetch.get('https://discordapp.com/assets/f78426a064bc9dd24847519259bc42af.png');
		const pfp = `data:${image.headers['content-type']};base64,${image.body.toString('base64')}`;
		const webhook = await msg.channel.createWebhook('CIyde', { avatar: pfp });
		content = `**${msg.author.tag}:** ${content}`;
		return snekfetch.post(`https://canary.discordapp.com/api/webhooks/${webhook.id}/${webhook.token}`)
			.send({ content })
			.then(() => {
				webhook.delete();
			})
			.catch((err) => {
				console.log(err);
				return webhook.delete('Error occured when running.');
			});
	}

};
