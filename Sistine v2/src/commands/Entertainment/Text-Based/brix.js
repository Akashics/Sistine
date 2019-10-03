const { Command } = require('klasa');
const { Canvas } = require('canvas-constructor');

Canvas.registerFont('./src/assets/fonts/Brixs.ttf', 'brix');

module.exports = class Brix extends Command {

	constructor(...args) {
		super(...args, {
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Make some "Bricky" text!',
			usage: '<text:string{1,75}>'
		});
	}

	async run(msg, [text]) {
		const initWidth = Math.floor(89 + (text.length * 64));
		const attachment = new Canvas(initWidth, 112)
			.setTextFont('120px brix')
			.setTextAlign('center')
			.setColor('#FFFFFF')
			.addText(text, Math.floor(initWidth / 2), 110, 500)
			.toBuffer();

		return msg.send({ files: [{ attachment, name: 'brix.png' }] });
	}


};
