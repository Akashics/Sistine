const { Command } = require('klasa');
const { Canvas } = require('canvas-constructor');

Canvas.registerFont('./src/assets/fonts/ribbon.ttf', { family: 'ribbon' });

module.exports = class Brix extends Command {

	constructor(...args) {
		super(...args, {
			requiredPermissions: ['ATTACH_FILES'],
			description: 'Make some "Bricky" text!',
			usage: '<text:string{1,60}>'
		});
	}

	async run(msg, [text]) {
		const beforeStr = text.split(''), afterStr = [], initWidth = Math.floor(254 + (beforeStr.join('').length * 31));

		for (var i = 0, len = beforeStr.length; i < len; i++) {
			if (i === 0) afterStr.unshift(beforeStr[i]);
			if (i > 0) afterStr.push(beforeStr[i].replace(beforeStr[i], `_${beforeStr[i]}`));
		}

		const attachment = new Canvas(initWidth, 196)
			.setTextFont('120px ribbon')
			.setTextAlign('center')
			.setColor('#FFFFFF')
			.addText(`(${afterStr.join('')})`, Math.floor(initWidth / 2), 98)
			.toBuffer();

		return msg.send({ files: [{ attachment, name: 'ribbon.png' }] });
	}


};
