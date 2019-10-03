const { Command } = require('klasa');
const { Canvas } = require('canvas-constructor');

Canvas.registerFont('./src/assets/fonts/Handstand.ttf', { family: 'handspeak' });

module.exports = class Clap extends Command {

	constructor(...args) {
		super(...args, {
			requiredPermissions: ['SEND_MESSAGES'],
			description: '9/10 people say Sign Language is Handy',
			usage: '<text:string{1,100}>'
		});
	}

	async run(msg, [text]) {
		const initWidth = Math.floor(76 + (text.length * 60));
		const attachment = new Canvas(initWidth, 120)
			.setTextFont('120px handspeak')
			.setTextAlign('center')
			.setColor('#FFFFFF')
			.addText(text, Math.floor(initWidth / 2), 104)
			.toBuffer();
		return msg.send({ files: [{ attachment, name: 'handy-language.png' }] });
	}

};
