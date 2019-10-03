const { Command } = require('klasa');
const Table = require('cli-table-redemption');

const pattern = [
	'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
	'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
].join('|');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['shard'],
			permissionLevel: 0,
			description: (lang) => lang.get('COMMAND_ECHO_DESCRIPTION')
		});
	}

	async run(msg) {
		var table = new Table({ head: ['Shard ID', 'Latency', 'Cached Guilds', 'Cached Users', msg.guild ? 'Current Shard' : null] });

		if (this.client.shard) {
			const results = await this.client.shard.broadcastEval(`[this.shard.id, this.ws.ping, this.guilds.size, this.users.size]`);
			results.forEach((result) => table.push([result[0], `${Math.round(result[1]).toFixed(1)}ms`, result[2], result[3], msg.guild ? this.client.shard.id === result[0] ? 'yes' : 'no' : null]));
		}


		return msg.sendCode('fix', await this.stripAnsi(table.toString()));
	}

	async stripAnsi(text) {
		return text.replace(new RegExp(pattern, 'g'), '');
	}

};
