const { Configuration, Extendable, SchemaFolder } = require('klasa');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, { appliesTo: [Configuration] });
	}

	list(msg, path) {
		const folder = path instanceof SchemaFolder ? path : this.gateway.getPath(path, { piece: false }).path;
		const output = [];
		let longest = 0;
		for (const [key, value] of folder.entries()) {
			if (key.length > longest) longest = key.length;
			output.push([key, value.type === 'Folder' ? '{ Folder }' : this.resolveString(msg, value)]);
		}
		return output.sort(([, value]) => value === '{ Folder }').map(([key, value]) => `${key.padEnd(longest)} :: ${value}`).join('\n');
	}

};
