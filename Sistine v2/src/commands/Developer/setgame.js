const { Command } = require("klasa");

module.exports = class extends Command {``

    constructor(...args) {
        super(...args, {
            usageDelim: " ",
            subcommands: true,
            hidden: true,
            aliases: ["sg"],
            permissionLevel: 10,
            usage: "<text|stream> <game:string> [...]",
            description: language => language.get("COMMAND_SG_DESCRIPTION")
        });
    }

    async text(msg, [...game]) {
        await this.client.shard.broadcastEval(`this.user.setPresence({ activity: { name: '${game.join(" ")}', status: "online" }})`);
        return msg.sendMessage(`Playing status has been changed to: ${game.join(" ")}`);
    }

    async stream(msg, [...game]) {
        await this.client.shard.broadcastEval(`this.user.setPresence({ activity: { name: '${game.join(" ")}', type: "STREAMING", status: "online", url: "https://twitch.tv/kashalles" }})`);
        return msg.sendMessage(`Playing status has been changed to: ${game.join(" ")}`);
    }

};