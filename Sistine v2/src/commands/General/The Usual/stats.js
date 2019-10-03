const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			enabled: true,
			description: (lang) => lang.get('COMMAND_STATS_DESCRIPTION')
		});
	}

	async processMemoryMB() {
		const heap = process.memoryUsage().heapUsed;
		const MB = heap / 1048576;
		return Math.floor(MB);
	}

	async regions(guildCount) {
		function prec(number) {
			var factor = Math.pow(10, 2);
			return Math.round(((number / guildCount) * 100) * factor) / factor;
		}

		let us = 0, eu = 0, ru = 0, ch = 0, br = 0, jp = 0, au = 0, sg = 0;

		const regions = await this.client.shard.broadcastEval('this.guilds.map((g) => g.region)').then((res) => res.reduce((acc, total) => total.concat(acc), []));
		regions.forEach((region) => {
			region = region.replace('vip-', '');

			if (region.startsWith('us-')) us++;
			if (region.startsWith('eu-') || region === 'london' || region === 'frankfurt') eu++;
			if (region === 'russia') ru++;
			if (region === 'hongkong') ch++;
			if (region === 'brazil') br++;
			if (region === 'japan') jp++;
			if (region === 'sydney') au++;
			if (region === 'signapore') sg++;
		});
		return [
			`**:flag_us: America**: ${us} *(${prec(us)}%)*`,
			`**:flag_eu: Europe**: ${eu + ru} *(${prec(eu + ru)}%)* [ **Russia**: ${ru} *(${prec(ru)}%)* ]`,
			`**:flag_cn: Asia**: ${ch + jp + sg} *(${prec(ch + jp + sg)}%)*`,
			`**:flag_br: South America**: ${br} *(${prec(br)}%)*`,
			`**:flag_au: Australia**: ${au} *(${prec(au)}%)*`].join(' | ');
	}

	uptime() {
		let totalSeconds = this.client.uptime / 1000;
		const hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;

		return `${hours}h ${minutes}m ${seconds.toFixed(2)}s`;
	}


	async run(msg) {
		const loading = await msg.send('Loading stats, this could take a few minutes...');
		const guilds = (await this.client.shard.fetchClientValues('guilds.size')).reduce((prev, val) => prev + val, 0);
		const users = (await this.client.shard.fetchClientValues('users.size')).reduce((prev, val) => prev + val, 0);
		const embed = new MessageEmbed()
			.setColor('PURPLE')
			.setAuthor(`Stats of ${this.client.user.username}`, this.client.user.displayAvatarURL())
			.setFooter(msg.author.tag, msg.author.displayAvatarURL())
			.addField('Shard Mem. Usage', `${(await this.processMemoryMB()).toString()} MB `, true)
			.addField('NodeJS Version', process.version, true)
			.addField('Guild Count', `${guilds.toLocaleString()} divided by ${this.client.shard.shardCount} shards.`, true)
			.addField('Client Uptime', this.uptime(), true)
			.addField('Cached Members', users.toLocaleString(), true)
			.addField(`Senko-san's Guild Regions`, await this.regions(guilds), true);
		await loading.delete().catch(() => console.error);
		return msg.send('', { embed });
	}

};
