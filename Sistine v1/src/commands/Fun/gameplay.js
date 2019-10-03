const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 30,
			description: 'Gives a steam game open url based on the game you pick',
			usage: '<csgo|dota|pubg|gmod|rocketleague|rl> [steamuser:string]',
			usageDelim: ' ',
			extendedHelp: 'No extended help available.'
		});

		this.games = {
			dota: {
				title: 'DOTA 2',
				img: 'http://cdn.edgecast.steamstatic.com/steam/apps/570/header.jpg',
				run: 'steam://run/570',
				url: 'http://store.steampowered.com/app/570/Dota_2/'
			},
			csgo: {
				title: 'Counter-Strike: Global Offensive',
				img: 'http://cdn.edgecast.steamstatic.com/steam/apps/730/header.jpg',
				run: 'steam://run/730',
				url: 'http://store.steampowered.com/app/730/CounterStrike_Global_Offensive/'
			},
			gmod: {
				title: "Garry's Mod",
				img: 'http://cdn.edgecast.steamstatic.com/steam/apps/4000/header.jpg',
				run: 'steam://run/4000',
				url: 'http://store.steampowered.com/app/4000/Garrys_Mod/'
			},
			pubg: {
				title: "PLAYERUNKNOWN'S BATTLEGROUNDS",
				img: 'http://cdn.edgecast.steamstatic.com/steam/apps/578080/header.jpg',
				run: 'steam://run/578080',
				url: 'http://store.steampowered.com/app/578080/PLAYERUNKNOWNS_BATTLEGROUNDS/'
			},
			rocketleague: {
				title: 'Rocket League',
				img: 'http://cdn.edgecast.steamstatic.com/steam/apps/252950/header.jpg',
				run: 'steam://run/252950',
				url: 'http://store.steampowered.com/app/252950/Rocket_League/'
			}
		};
	}

	async run(msg, [game, steamid]) {
		game = this.getGame(game);
		const embed = new MessageEmbed()
			.setColor('#1976D2')
			.setDescription(`
[**${game.title}**](${game.url})

**Steam Profile** ${steamid ? `[${msg.author.username}](https://steamcommunity.com/id/${steamid})` : 'Not provided'}
**Launch ${game.title}** ${game.run}
            `)
			.setImage(game.img);
		return msg.send(`Come play ${game.title} with ${msg.author.username}, they need friends.`, { embed });
	}

	getGame(game) {
		game = game.toLowerCase();
		switch (game) {
			case 'dota': return this.games.dota;
			case 'csgo': return this.games.csgo;
			case 'gmod': return this.games.gmod;
			case 'pubg': return this.games.pubg;
			case 'rl':
			case 'rocketleague': return this.games.rocketleague;
			default:
		}
	}

};
