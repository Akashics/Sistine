const { Command } = require('klasa');


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["tpg"],
            hidden: true,
            permissionLevel: 10,
            usage: "<guild:string>",
            description: language => language.get("COMMAND_TPG_DESCRIPTION")
        });
    }

    async run(msg, [guild]) {
        const exists = this.client.settings.premium.includes(guild);
        await this.client.settings.update("premium", guild);
        return msg.sendMessage(`${exists ? "**Removed Guild:**" : "**Added Guild:**"} ${guild}`);
    }

};