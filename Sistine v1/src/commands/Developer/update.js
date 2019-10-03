const { Command } = require('klasa');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const path = require('path');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 10,
			description: 'Update Sistine from her Git Repo.',
			guarded: true
		});
	}

	async run(msg) {
		const { stdout, stderr, err } = await exec(`git pull ${require('../../../package.json').repository.url.split('+')[1]}`, { cwd: path.join(__dirname, '../../../') }).catch(errs => ({ errs }));
		if (err) return console.error(err);
		const out = [];
		if (stdout) out.push(stdout);
		if (stderr) out.push(stderr);
		await msg.channel.send(out.join('---\n'), { code: true });
		if (!stdout.toString().includes('Already up-to-date.')) {
			await msg.channel.send('Finished Updating. Rebooting shard...').catch(error => this.client.console.error(error));
			this.client.destroy();
			process.exit(1);
		}
	}

};
