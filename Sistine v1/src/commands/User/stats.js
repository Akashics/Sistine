const { Command, util } = require('klasa');
const { MessageEmbed } = require('discord.js');
const ostb = require('os-toolbox');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description: (msg) => msg.language.get('COMMAND_STATS_DESCRIPTION')
		});
	}

	async processMemoryMB() {
		const heap = process.memoryUsage().heapUsed;
		const MB = heap / 1048576;
		return Math.floor(MB);
	}

	async regions() {
		const usa = [];
		const europe = [];
		const russia = [];
		const china = [];
		const brazil = [];
		const japan = [];
		const au = [];
		const sig = [];
		const guildCount = this.client.guilds.size;
		await this.client.guilds.forEach((guild) => {
			if (guild.region.startsWith('us-')) usa.push(guild.id);
			if (guild.region.startsWith('eu-')) europe.push(guild.id);
			if (guild.region === 'russia') {
				russia.push(guild.id);
			}
			if (guild.region === 'hongkong') {
				china.push(guild.id);
			}
			if (guild.region === 'brazil') {
				brazil.push(guild.id);
			}
			if (guild.region === 'japan') {
				japan.push(guild.id);
			}
			if (guild.region === 'sydney') {
				au.push(guild.id);
			}
			if (guild.region === 'signapore') {
				sig.push(guild.id);
			}
		});

		function prec(number, precision) {
			var factor = Math.pow(10, precision);
			return Math.round(number * factor) / factor;
		}
		const regInfo = `**:flag_us: America**: ${usa.length} \`(${prec((usa.length / guildCount) * 100, 2)}%)\` | **:flag_eu: Europe**: ${europe.length + russia} \`(${prec(((europe.length + russia.length) / guildCount) * 100, 2)}%)\` [**Russia**: ${russia.length} \`(${prec((russia.length / guildCount) * 100, 2)}%)\`]\n**:flag_cn: Asia**: ${china.length + japan.length + sig.length} \`(${prec(((china.length + japan.length + sig.length) / guildCount) * 100, 2)}%)\` | **:flag_br: South America**: ${brazil.length} \`(${prec((brazil.length / guildCount) * 100, 2)}%)\` | **:flag_au: Australia**: ${au.length} \`(${prec((au.length / guildCount) * 100, 2)}%)\``;
		return regInfo;
	}


	async run(msg) {
		const loading = await msg.send('Loading stats, this could take a few minutes...');
		const guilds = (await this.client.shard.fetchClientValues('guilds.size')).reduce((prev, val) => prev + val, 0);
		const users = (await this.client.shard.fetchClientValues('users.size')).reduce((prev, val) => prev + val, 0);
		const mintime = ostb.uptime() / 60;
		const uptime = Math.floor(mintime / 60);
		const botPing = Math.floor(this.client.ping);
		const regionInfo = await this.regions();

		const nodeme = await this.processMemoryMB();
		const mem = await ostb.memoryUsage();
		const me = this.client;
		const { stdout } = await util.exec('speedtest-cli --simple');
		const embed = new MessageEmbed()
			.setColor('PURPLE')
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
			.setFooter(msg.guild.name, msg.guild.iconURL())
			.setTitle('Statistics')
			.addField('Server Mem. Usage', `${mem}%`, true)
			.addField('NodeJS Mem. Usage', `${nodeme.toString()} MB `, true)
			.addField('NodeJS Version', process.version, true)
			.addField('Shard Count', me.shard.count, true)
			.addField('Guild Count', guilds, true)
			.addField('Member Count', users, true)
			.addField('Client Uptime', `${Math.floor((botPing / (1000 * 60 * 60)) % 24)} hours`, true)
			.addField('Server Uptime', `${JSON.stringify(uptime)} hours`, true)
			.addField(`Shard ${me.shard.id} Guild Regions`, regionInfo, true)
			.addField('Speed Test', `\`\`\`\n${stdout}\n\`\`\``);
		loading.delete();
		return msg.send('', { embed });
	}

};
