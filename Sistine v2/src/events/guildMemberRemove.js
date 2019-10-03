const { Event } = require("klasa");
const ServerLog = require("../library/Util/ServerLog");

module.exports = class extends Event {

    async run(member) {
        await new ServerLog(member.guild)
            .setColor("red")
            .setType("leave")
            .setName("Member Joined")
            .setMessage(`📤 ${member.user} (${member.id}) has left **${member.guild.name}**.`)
            .send();

        await this.leaveMessage(member);
    }

    leaveMessage(member) {
        if (!member.guild.settings.toggles.leavemsg) return;
        const channel = member.guild.channels.get(member.guild.settings.channels.leave);
        if (!channel || (channel && !channel.postable)) return;
        return channel.send(this.replaceText(member.guild.settings.messages.leave, member));
    }


    replaceText(str, member) {
        return str.replace(/\{(mention|server|server\.id|username|user\.tag|user\.id|user|displayname|id|size|members|count)\}/gi, (__, match) => {
            switch (match.toLowerCase()) {
                case "mention": return member.toString();
                case "server": return member.guild.name;
                case "server.id": return member.guild.id;
                case "user":
                case "displayname":
                case "username": return member.user.username;
                case "user.tag": return member.user.tag;
                case "user.id":
                case "id": return member.id;
                case "size":
                case "members":
                case "count": return member.guild.memberCount;
                default: return __;
            }
        });
    }

};
