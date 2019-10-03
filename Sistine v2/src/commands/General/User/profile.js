const Command = require('../../../library/Util/KlasaCommand');
const { Canvas } = require('canvas-constructor');
const fs = require('fs-nextra');
const { get } = require('snekfetch');

Canvas.registerFont(`./src/assets/fonts/Roboto-Regular.ttf`, 'Roboto');
Canvas.registerFont(`./src/assets/fonts/RobotoCondensed-Regular.ttf`, 'Roboto Condensed');
Canvas.registerFont(`./src/assets/fonts/RobotoMono-Light.ttf`, 'Roboto Mono');
Canvas.registerFont(`./src/assets/fonts/NotoEmoji-Regular.ttf`, 'NotoEmoji');


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 60,
			requiredPermissions: ['USE_EXTERNAL_EMOJIS', 'ATTACH_FILES'],
			description: language => language.get('COMMAND_PROFILE_DESCRIPTION'),
			usage: '[user:username]',
			extendedHelp: 'No extended help available.'
		});
	}

	async run(msg, [user = msg.author]) {
		if (user.bot) return msg.reply('Sorry, bots cannot have profiles.');
		const load = await msg.sendMessage('Please wait while I gather your data...');
		msg.channel.sendFile(await this.createImage(user));
		return load.delete();
	}

	async createImage(user) {
		await user.settings.sync(true);
		const database = this.client.providers.default.db;
		const { xp, level: lvl, flowers, reps } = user.settings;

		const oldLvl = Math.floor((lvl / 0.2) ** 2);
		const nextLvl = Math.floor(((lvl + 1) / 0.2) ** 2);
		const xpProg = Math.round(((xp - oldLvl) / (nextLvl - oldLvl)) * 269);

		const query = await database.db('Senko-san').table('users').orderBy({ index: database.desc('xp') }).pluck('id', 'xp').limit(10000).offsetsOf(database.row('id').eq(user.id))
			.run();
		const pos = query.length ? `#${Number(query) + 1}` : 'More Than 10,000';

		const bgImg = await fs.readFile(`./src/assets/profiles/bg.png`);
		const avatar = await get(user.displayAvatarURL({ format: 'png', sze: 1024 })).then(res => res.body).catch((err) => {
			Error.captureStackTrace(err);
			return err;
		});

		return await new Canvas(1125, 675)
		// Initializing & Avatar
			.addImage(bgImg, 0, 0, 1125, 675)
			.addImage(avatar, 69, 96, 256, 256)
			.setTextFont('64px Roboto')
			.setColor('#FFF')
			.addResponsiveText(user.tag, 28, 426)
			.setTextFont('24px Roboto')
		// Main Content
			.setTextAlign('left')
			.setColor('#FFF')
			.addText(`${flowers.toLocaleString()} Flowers`, 102, 480, 190)
			.addText(`${reps} Reputation Points`, 102, 567)
			.addText(`${pos.startsWith('#') ? `Ranked ${pos.toLocaleString()}` : pos}`, 102, 636, 193)
		// XP Bar
			.setColor('#459466')
			.addRect(69, 352.2, xpProg, 15.5)
			.setTextFont('10px Roboto')
			.setColor('#FFFFFF')
			.setTextAlign('center')
			.addText(`XP: ${xp} / ${nextLvl}`, 195.5, 364)
			.setTextFont('10px Roboto')
			.addText(`Lvl ${lvl}`, 88, 364)
			.toBufferAsync();
	}

};
