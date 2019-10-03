const { Event } = require('klasa');
const ServerLog = require('../library/Util/ServerLog');

module.exports = class extends Event {

    async run(channel) {
        if (channel.type === "voice") {
            if (channel.guild.music.queue && !channel.guild.music.voiceChannel) {
                if (channel.guild.music.textChannel) channel.guild.music.textChannel.sendMessage(`:white_check_mark: Queue cleared, leaving voice channel.`).catch(() => null);
                channel.guild.music.destroy();
            }
            return;
        } else if (channel.type === "text") {
            await new ServerLog(channel.guild)
                .setColor("red")
                .setType("channels")
                .setName("Channel Deleted")
                .setMessage(`?? **#${channel.name}** (${channel.id}) channel was \`deleted\``)
                .send();
        }
        return;
    }

};