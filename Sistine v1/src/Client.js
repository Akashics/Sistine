if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');

const { Client, PermissionLevels } = require('klasa');
const { Collection, WebhookClient } = require('discord.js');
const path = require('path');
const MusicManager = require('./lib/structures/MusicManager');
const RawEventStore = require('./lib/structures/RawEventStore');
const AFK = require('./lib/structures/afk');
const { ClientOptions } = require('./lib/util/Constants');
const IdioticClient = require('./lib/structures/IdioticClient');
const settings = require('../settings.js');

const permissionLevels = new PermissionLevels()
	.add(0, () => true)
	.add(2, (client, msg) => {
		if (!msg.guild || msg.member) return false;
		const djRoleId = msg.guild.configs.roles.dj;
		return djRoleId && msg.member.roles.has(djRoleId);
	}, { fetch: true })
	.add(4, (client, msg) => {
		if (!msg.guild || msg.member) return false;
		const modRoleId = msg.guild.configs.roles.mod;
		return modRoleId && msg.member.roles.has(modRoleId);
	}, { fetch: true })
	.add(5, (client, msg) => {
		if (!msg.guild || !msg.member) return false;
		const adminRoleId = msg.guild.configs.roles.admin;
		return adminRoleId && msg.member.roles.has(adminRoleId);
	}, { fetch: true })
	.add(6, (client, msg) => msg.guild && msg.member && msg.member.permissions.has('MANAGE_GUILD'), { fetch: true })
	.add(7, (client, msg) => msg.guild && msg.member && msg.member === msg.guild.owner, { fetch: true })
	.add(9, (client, msg) => settings.developers.includes(msg.author.id), { break: true })
	.add(10, (client, msg) => msg.author.id === client.owner.id);

class SistineClient extends Client {

	constructor() {
		super({ ...ClientOptions, permissionLevels, prefix: 's>', production: true });

		Object.defineProperty(this, 'settings', { value: settings });

		this.clientBaseDir = path.resolve('src');
		this.lavalink = require('./lib/structures/LavalinkClient');
		this.wait = require('util').promisify(setTimeout);
		this.music = new MusicManager(this);
		this.ramStat = new Array(60);
		this.cmdStat = new Array(60);
		this.idioticApi = new IdioticClient(settings.apiTokens.idioticapi);
		this.botlog = new WebhookClient(settings.webhook.botlog.id, settings.webhook.botlog.secret);
		this.joinlog = new WebhookClient(settings.webhook.joinlog.id, settings.webhook.joinlog.secret);
		this.afks = new AFK(this);
		this.executedCommands = new Collection();

		this.rawEvents = new RawEventStore(this);

		this.registerStore(this.rawEvents);
	}

}

SistineClient.token = settings.token;

module.exports = SistineClient;
