const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const snekfetch = require('snekfetch');

module.exports = class ClientMethods {

	static friendlyDuration(ms) {
		const sec = Math.floor((ms / 1000) % 60).toString();
		const min = Math.floor((ms / (1000 * 60)) % 60).toString();
		const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
		return `${hrs.padStart(2, '0')}h ${min.padStart(2, '0')}m ${sec.padStart(2, '0')}s`;
	}

	static async weebImage(msg, client, action) {
		const image = await fetch(`https://api.weeb.sh/images/random?type=${msg.command.name}`, {
			headers: { 'Content-Type': 'application/json',
				Authorization: `Wolke ${client.config.weebservices}`,
				'User-Agent': 'Senko-san/1.0.0-dev' }
		})
			.then((res) => res.json())
			.catch((err) => console.log(`[Weeb Services] ${err}`));

		return new MessageEmbed()
			.setColor('PINK')
			.setImage(image.url)
			.setDescription(action);
	}

	static async scrapeSubreddit(subreddit) {
		subreddit = typeof subreddit === 'string' && subreddit.length !== 0 ? subreddit : 'puppies';
		const img = await fetch(`https://imgur.com/r/${subreddit}/hot.json`)
			.then((res) => res.json())
			.then((res) => {
				if (!res.data) return '500';
				return res.data[Math.floor(Math.random() * res.data.length)];
			});
		return `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, '')}`;
	}

	static randomNumber(min, max) {
		if (typeof min !== 'number') throw 'Minimum value must be a number';
		if (typeof max !== 'number') throw 'Maximum value must be a number';
		if (min >= max) throw 'Minimum must be less than Maximum to determine the range';
		return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
	}

};
