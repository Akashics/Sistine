const { MessageEmbed } = require('discord.js');
const snekfetch = require('snekfetch');

class Util {

	static list(arr, conj = 'and') {
		const { length } = arr;
		return `${arr.slice(0, -1).join(', ')}${length > 1 ? `${length > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
	}

	static splitText(str, length) {
		const textLength = str.substring(0, length).lastIndexOf(' ');
		const pos = textLength === -1 ? length : textLength;
		return str.substring(0, pos);
	}

	static async weebImage(msg, client, action) {
		const imageRequest = await snekfetch.get(`https://api.weeb.sh/images/random?type=${msg.command.name}`)
			.set('Authorization', `Wolke ${client.settings.apiTokens.weebservices}`)
			.set('User-Agent', 'Sistine/5.0.0-dev')
			.catch(error => client.emit('error', `[Weeb Services] ${error}`));

		return new MessageEmbed()
			.setColor('PURPLE')
			.setImage(imageRequest.body.url)
			.setDescription(action);
	}

	static async haste(input, extension) {
		return new Promise((res, rej) => {
			if (!input) rej('Input argument is required.');
			snekfetch.post('https://hastebin.com/documents').send(input).then(body => {
				res(`https://hastebin.com/${body.body.key}${extension ? `.${extension}` : ''}`);
			}).catch((error) => rej(error));
		});
	}

}

module.exports = Util;
