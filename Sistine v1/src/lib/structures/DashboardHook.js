const { APIServer, json, cors } = require('http-nextra');
const snekfetch = require('snekfetch');
const { util: { isFunction }, Duration, Timestamp } = require('klasa');

/* eslint-disable camelcase */
class DashboardHook extends APIServer {

	constructor(client, options = { port: 6565 }) {
		super({ middlewares: [json, cors] });

		this.client = client;
		this.ts = new Timestamp('DD:hh:mm:ss');

		this.router.get('/', (req, res) => res.status(200).json({ message: 'Welcome to the Sistine Bot API.' }));

		this.router.get('/commands', (request, response) => {
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

		this.router.get('/stats', async (request, response) => {
			response.setHeader('Access-Control-Allow-Origin', '*');
			response.setHeader('Access-Control-Allow-Headers', '*');

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

		this.router.get('/application', (request, response) => response.json({
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

		this.router.get('/users', (req, res) => res.status(200).json([...client.users.keys()]));

		this.router.get('/users/:id', async (req, res, { id }) => {
			if (id === 'all') return res.json([...client.users.values()]);
			const user = await client.users.fetch(id).catch(() => null);
			if (!user) return res.json({ message: 'Could not find that user.' });
			return res.json(user.toJSON());
		});

		this.router.get('/guilds', (request, response) => response.end(JSON.stringify(this.client.guilds.keyArray())));

		this.router.get('/guilds/:guildID', async (request, response, { guildID }) => {
			const guild = await this.client.guilds.get(guildID);
			const owner = await this.client.users.get(guild.ownerID).tag;
			if (!guild || guild === null) return response.json({});
			return response.json({ guild, owner });
		});

		this.router.get('/guilds/:guildID/config/reset', async (request, response, { guildID }) => {
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) return response.end('{ "success": false }');
			await guild.configs.reset();
			return response.json({ success: true });
		});

		this.router.get('/guilds/:guildID/members', async (request, response, { guildID }) => {
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) response.end('[]');
			return response.json(guild.members.keyArray());
		});

		this.router.get('/guilds/:guildID/members/:memberID', async (request, response, { guildID, memberID }) => {
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) return response.json({});
			const member = guild.members.get(memberID);
			if (!member || member === null) return response.json({});
			const manage = member.permissions.has('MANAGE_GUILD');
			return response.json({ member, manage });
		});

		this.router.get('/guilds/:guildID/members/:memberID/manager', async (request, response, { guildID, memberID }) => {
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) return response.end('{}');
			const member = guild.members.get(memberID);
			if (!member || member === null) return response.end('{}');
			const manage = member.permissions.has('MANAGE_GUILD');
			return response.json({ manage });
		});

		this.router.get('/guilds/:guildID/roles', async (request, response, { guildID }) => {
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) response.end('[]');
			return response.json(guild.roles.keyArray());
		});

		this.router.get('/guilds/:guildID/roles/:roleID', async (request, response, { guildID, roleID }) => {
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) return response.end('{}');
			const role = guild.members.get(roleID);
			if (!role) return response.end('{}');
			return response.json({ role });
		});

		this.router.get('/guilds/:guildID/channels', async (request, response, { guildID }) => {
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) response.end('[]');
			return response.json(guild.channels.keyArray());
		});

		this.router.get('/guilds/:guildID/channels/:channelID', async (request, response, { guildID, channelID }) => {
			const guild = await this.client.guilds.get(guildID);
			if (!guild || guild === null) return response.end('{}');
			const channel = guild.members.get(channelID);
			if (!channel) return response.end('{}');
			return response.json({ channel });
		});

		const clientId = this.client.user.id;
		const { clientSecret } = this.client.settings.dashboard;

		this.router.options('/oauth/callback', (req, res) => {
			res.set({
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
			});
			return res.end('OK');
		});

		this.router.post('/oauth/callback', async (req, res) => {
			if (!req.body.code) return res.json({ message: 'No code provided' });
			const creds = Buffer.from(`${clientId}:${clientSecret}`, 'binary').toString('base64');
			const response = await snekfetch.post(`https://discordapp.com/api/oauth2/token`)
				.set({ Authorization: `Basic ${creds}` })
				.query({
					grant_type: 'authorization_code',
					redirect_uri: 'http://localhost:4000',
					code: req.body.code
				});
			return res.json(response.body);
		});

		this.router.options('/oauth/user', (req, res) => {
			res.set({
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
			});
			return res.send('OK');
		});

		this.router.get('/oauth/user', async (req, res) => {
			const auth = req.get('Authorization');
			if (!auth) return res.status(401).json({ message: 'Unauthorized' });
			const { body: user } = await snekfetch.get('https://discordapp.com/api/users/@me')
				.set('Authorization', auth);
			const { body: guilds } = await snekfetch.get('https://discordapp.com/api/users/@me/guilds')
				.set('Authorization', auth);
			user.guilds = guilds;
			return res.json(user);
		});

		this.router.get('/schema/guilds', async (req, res) => {
			const schema = await this.client.gateways.guilds.schema.toJSON();
			/* const data = this.client.gateways.guilds.schema;
			const schema = [];
			for (const key of data.values(true)) {
				schema.push(key);
			}
			console.log(schema);*/
			return res.json({ schema });
		});

		this.router.get('/schema/users', async (req, res) => {
			const data = this.client.gateways.users.schema;
			return res.json({ data });
		});

		this.router.get('/configs/get/guilds/:guildID/:type/', async (request, response, { guildID, type }) => {
			const Authorization = request.get('Authorization');
			if (Authorization !== this.client.settings.dashboard.sessionSecret) {
				return response.end('Incorrect Authorization token!');
			}
			if (Authorization === this.client.settings.dashboard.sessionSecret) {
				const configurations = [];
				if (type === 'all') {
					configurations.push(this.client.guilds.get(guildID).configs);
				} else if (type) {
					configurations.push(await this.client.guilds.get(guildID).configs[type]);
				}
				return response.json({ configurations });
			}
			return response.end('Incorrect Authorization token!');
		});

		this.router.put('/configs/put/guilds/:guildID/:type/', async (request, response, { guildID, type }) => {
			const Authorization = request.get('Authorization');
			const Data = request.get('Data');
			if (Authorization !== this.client.settings.dashboard.sessionSecret) {
				return response.end('Incorrect Authorization token!');
			}
			if (Authorization === this.client.settings.dashboard.sessionSecret) {
				try {
					await this.client.guilds.get(guildID).configs.update(type, Data, this.client.guilds.get(guildID));
					return response.end('Success!');
				} catch (err) {
					this.client.emit('wtf', err);
					return response.end(err);
				}
			}
			return response.end('Incorrect Authorization token!');
		});

		this.router.put('/guilds/:guildID/leave', async (request, response, { guildID }) => {
			const Authorization = request.get('Authorization');
			if (Authorization !== this.client.settings.dashboard.sessionSecret) {
				return response.end('Incorrect Authorization token!');
			}
			if (Authorization === this.client.settings.dashboard.sessionSecret) {
				try {
					await this.client.guilds.get(guildID).leave();
					return response.end('Success!');
				} catch (err) {
					this.client.emit('wtf', err);
					return response.end(err);
				}
			}
			return response.end('Incorrect Authorization token!');
		});

		for (const [name, store] of this.client.pieceStores) {
			this.router.get(`${name}/`, (request, response) => response.end(JSON.stringify(store.keyArray())));

			this.router.get(`${name}/:id`, (request, response, { id }) => {
				const piece = store.get(id);
				if (!piece) response.end('{}');
				return response.end(JSON.stringify(piece));
			});
		}

		this.listen(options.port, () => this.client.emit('log', `[API] Started on port ${options.port}.`));
	}

}

module.exports = DashboardHook;
