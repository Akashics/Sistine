const { Command, util } = require('klasa');

module.exports = class Hoot extends Command {

	constructor(...args) {
		super(...args, {
			requiredPermissions: ['SEND_MESSAGE'],
			description: 'I have no clue what all the hoot is about.',
			usage: '<text:string{1,1000}>'
		});
	}

	async run(msg, [text]) {
		const translateMessg = await msg.send(`<:translate:517463962900758529> _Translating your message to **Owl**_...`);
		await util.sleep(3000);
		const hooted = text.replace(/\b[^\d\W]+\b/g, 'hoot');
		return translateMessg.edit(`<:translate:517463962900758529> **Translation**: ${hooted}`);
	}

};
