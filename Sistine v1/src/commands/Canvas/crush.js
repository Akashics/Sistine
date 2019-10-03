const { Command } = require('klasa');
const { Canvas } = require('canvas-constructor');
const snek = require('snekfetch');
const fsn = require('fs-nextra');

const getCrushed = async (crusher, crush) => {
	const pngCrusher = crusher.replace(/\.gif.+/g, '.png');
	const pngCrush = crush.replace(/\.gif.+/g, '.png');
	const [plate, Crusher, Crush] = await Promise.all([
		fsn.readFile('./src/assets/images/plate_crush.png'),
		snek.get(pngCrusher),
		snek.get(pngCrush)
	]);
	return new Canvas(600, 873)
		.rotate(-0.09)
		.addImage(Crush.body, 109, 454, 417, 417)
		.resetTransformation()
		.addImage(plate, 0, 0, 600, 873)
		.addImage(Crusher.body, 407, 44, 131, 131, { type: 'round', radius: 66 })
		.restore()
		.toBuffer();
};

module.exports = class Crush extends Command {

	constructor(...args) {
		super(...args, {
			description: (msg) => msg.language.get('COMMAND_CRUSH_DESCRIPTION'),
			usage: '[User:user]',
			cooldown: 10
		});
	}

	async run(msg, [user = msg.author]) {
		const message = await msg.send(msg.language.get('COMMAND_CRUSH', user.tag));
		const result = await getCrushed(msg.author.displayAvatarURL({ format: 'png' }), user.displayAvatarURL({ format: 'png' }));
		await msg.send({ files: [{ attachment: result, name: 'crush.png' }] });
		return message.delete();
	}

};
