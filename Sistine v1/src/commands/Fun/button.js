const { Command } = require('klasa');
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');

Canvas.registerFont('./src/assets/fonts/ComicSansMS2.ttf', { family: 'ComicSans' });

module.exports = class Button extends Command {

	constructor(...args) {
		super(...args, {
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Create and SMASH that button!',
			usage: '<text:string{1,150}>'
		});
	}

	async run(msg, [text]) {
		const button = await fsn.readFile('./src/assets/images/button.png');
		const attachment = new Canvas(504, 375)
			.addImage(button, 0, 0, 504, 375)
			.setColor('#FFFFFF')
			.setTextFont('38px ComicSans')
			.addMultilineText(text, 133, 178, 238, 38)
			.toBuffer();
		return msg.send({ files: [{ attachment, name: 'button.png' }] });
	}


};
