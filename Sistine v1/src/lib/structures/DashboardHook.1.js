const Polka = require('polka')().constructor;
const { util: { isFunction }, Duration, Timestamp } = require('klasa');

/* eslint-disable camelcase */
class DashboardHook extends Polka {

	constructor(client, options = { port: 6565 }, tokens) {
		super();

		this.client = client;
		this.origin = options.origin;
		this.tokens = tokens;

		this.use(this.authenticate.bind(this));
		this.use(this.setHeaders.bind(this));

		this.ts = new Timestamp('DD:hh:mm:ss');

		this.get('/', (req, res) => res.status(200).json({ message: 'Welcome to the Sistine Bot API.' }));

		this.get('/commands', (request, response) => {
			const commands = {};
			const msg = { language: this.client.languages.default };
			this.client.commands.filter(cmd => cmd.permissionLevel <= 6).forEach(cmd => {
				if (!commands.hasOwnProperty(cmd.category)) commands[cmd.category] = [];

				commands[cmd.category].push({
					name: cmd.name,
					aliases: cmd.aliases,
					description: isFunction(cmd.description) ? cmd.description(msg) : cmd.description,
					extendedHelp: isFunction(cmd.extendedHelp) ? cmd.extendedHelp(msg) : cmd.extendedHelp,
					requiredPermissions: cmd.requiredPermissions,
					category: cmd.catergory,
					cooldown: {
						usages: cmd.bucket,
						duration: cmd.cooldown
					},
					deletable: cmd.deletable,
					enabled: cmd.enabled,
					nsfw: cmd.nsfw,
					permissionLevel: cmd.permissionLevel,
					requiredConfigs: cmd.requiredConfigs,
					runIn: cmd.runIn,
					usage: cmd.usage.nearlyFullUsage
				});
			});
			return response.json(commands);
		});

		this.get('/stats', async (request, response) => {
			const guilds = (await this.client.shard.fetchClientValues('guilds.size')).reduce((prev, val) => prev + val, 0);
			const users = (await this.client.shard.fetchClientValues('users.size')).reduce((prev, val) => prev + val, 0);
			const textChannels = (await this.client.shard.fetchClientValues('channels.size')).reduce((prev, val) => prev + val, 0);
			const voiceChannels = (await this.client.shard.fetchClientValues('voiceConnections.size')).reduce((prev, val) => prev + val, 0);

			const { executions, messages } = this.client.configs;
			const { ping, status, uptime } = this.client;
			const shard = this.client.shard.count;
			const memory = process.memoryUsage().heapUsed / 1024 / 1024;
			return response.json({ shard, status, ping, uptime, memory, guilds, users, textChannels, voiceChannels, executions, messages, version: 'v2', nodeVersion: process.nodeVersion });
		});

		this.get('/application', (request, response) => response.json({
			commandCount: this.client.commands.size,
			eventCount: this.client.events.size,
			monitorCount: this.client.monitors.size,
			inhibitorCount: this.client.inhibitors.size,
			finalizerCount: this.client.finalizers.size,
			tasksCount: this.client.tasks.size,
			shards: this.client.options.shardCount,
			uptime: Duration.toNow(Date.now() - (process.uptime() * 1000)),
			formatedUptime: this.ts.display(process.uptime()),
			latency: {
				ping: this.client.ping.toFixed(0),
				pings: this.client.pings
			},
			memory: process.memoryUsage().heapUsed / 1024 / 1024,
			invite: this.client.invite,
			...this.client.application
		}));

		this.get('/users', (req, res) => res.status(200).json([...client.users.keys()]));

		this.get('/users/:id', async (req, res) => {
			const { id } = req.params;
			if (id === 'all') return res.json([...client.users.values()]);
			const user = await client.users.fetch(id).catch(() => null);
			if (!user) return res.json({ message: 'Could not find that user.' });
			return res.json(user.toJSON());
		});

		this.get('/guilds', (request, response) => response.end(JSON.stringify(this.client.guilds.keyArray())));

		this.get('/guilds/:guildID', async (request, response) => {
			const { guildID } = request.params;
			const guild = await this.client.guilds.get(guildID);
			const owner = await this.client.users.get(guild.ownerID).tag;
			if (!guild || guild === null) return response.json({});
			return response.json({ guild, owner });
		});

		this.get('/guilds/:guildID/config/reset', async (request, response) => {
			const { guildID } = request.params;
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) return response.end('{ "success": false }');
			await guild.configs.reset();
			return response.json({ success: true });
		});

		this.get('/guilds/:guildID/members', async (request, response) => {
			const { guildID } = request.params;
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) response.end('[]');
			return response.json(guild.members.keyArray());
		});

		this.get('/guilds/:guildID/members/:memberID', async (request, response) => {
			const { guildID, memberID } = request.params;
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) return response.json({});
			const member = guild.members.get(memberID);
			if (!member || member === null) return response.json({});
			const manage = member.permissions.has('MANAGE_GUILD');
			return response.json({ member, manage });
		});

		this.get('/guilds/:guildID/members/:memberID/manager', async (request, response) => {
			const { guildID, memberID } = request.params;
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) return response.end('{}');
			const member = guild.members.get(memberID);
			if (!member || member === null) return response.end('{}');
			const manage = member.permissions.has('MANAGE_GUILD');
			return response.json({ manage });
		});

		this.get('/guilds/:guildID/roles', async (request, response) => {
			const { guildID } = request.params;
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) response.end('[]');
			return response.json(guild.roles.keyArray());
		});

		this.get('/guilds/:guildID/roles/:roleID', async (request, response) => {
			const { guildID, roleID } = request.params;
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) return response.end('{}');
			const role = guild.members.get(roleID);
			if (!role) return response.end('{}');
			return response.json({ role });
		});

		this.get('/guilds/:guildID/channels', async (request, response) => {
			const { guildID } = request.params;
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) response.end('[]');
			return response.json(guild.channels.keyArray());
		});

		this.get('/guilds/:guildID/channels/:channelID', async (request, response) => {
			const { guildID, channelID } = request.params;
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) return response.end('{}');
			const channel = guild.members.get(channelID);
			if (!channel) return response.end('{}');
			return response.json({ channel });
		});

		this.get('/schema/guilds', async (req, res) => {
			const schema = await this.client.gateways.guilds.schema.toJSON();
			/* const data = this.client.gateways.guilds.schema;
			const schema = [];
			for (const key of data.values(true)) {
				schema.push(key);
			}
			console.log(schema);*/
			return res.json({ schema });
		});

		this.get('/schema/users', async (req, res) => {
			const data = this.client.gateways.users.schema;
			return res.json({ data });
		});

		this.get('/configs/get/guilds/:guildID/:type/', async (request, response) => {
			const { guildID, type } = request.params;
			const configurations = [];
			if (type === 'all') {
				configurations.push(this.client.guilds.get(guildID).configs);
			} else if (type) {
				configurations.push(await this.client.guilds.get(guildID).configs[type]);
			}
			return response.json({ configurations });
		});

		this.put('/configs/put/guilds/:guildID/:type/', async (request, response) => {
			const { guildID, type } = request.params;
			const { Data } = request.headers;
			try {
				await this.client.guilds.get(guildID).configs.update(type, Data, this.client.guilds.get(guildID));
				return response.end('Success!');
			} catch (err) {
				this.client.emit('wtf', err);
				return response.end(err);
			}
		});

		this.put('/guilds/:guildID/leave', async (request, response) => {
			const { guildID } = request.params;
			try {
				await this.client.guilds.get(guildID).leave();
				return response.end('Success!');
			} catch (err) {
				this.client.emit('wtf', err);
				return response.end(err);
			}
		});

		for (const [name, store] of this.client.pieceStores) {
			this.get(`${name}/`, (request, response) => response.end(JSON.stringify(store.keyArray())));

			this.get(`${name}/:id`, (request, response, { id }) => {
				const piece = store.get(id);
				if (!piece) response.end('{}');
				return response.end(JSON.stringify(piece));
			});
		}

		this.listen(options.port, () => this.client.emit('log', `[API] Started on port ${options.port}.`));
	}

	async authenticate(req, res, next) {
		const { Authorization } = req.headers;
		res.statusCode = !Authorization ? !this.tokens.includes(Authorization) ? 418 : 401 : 200;
		if (!Authorization) return res.end(JSON.stringify({ message: 'No authorization header was present in your request.', status: res.statusCode }));
		if (!this.tokens.includes(Authorization)) return res.end(JSON.stringify({ message: 'The authorization token you provided did not match the ones in our teapot.', status: res.statusCode }));
		next();
	}

	setHeaders(request, response, next) {
		response.setHeader('Access-Control-Allow-Origin', this.origin);
		response.setHeader('Access-Control-Allow-Headers', this.origin);
		response.setHeader('Content-Type', 'application/json');
		next();
	}

}

module.exports = DashboardHook;
