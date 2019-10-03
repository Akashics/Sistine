const { Route } = require('klasa-dashboard-hooks');

module.exports = class extends Route {

	constructor(...args) {
		super(...args, {
			route: 'votes/dbl'
		});
	}

	async post(req, res) {
		if (req.headers.authorization !== this.client.config.dblauth) {
			res.statusCode = 401;
            return res.end(JSON.stringify({ message: "Unauthenticated" }));
		}
		const data = req.body;

        const user = await this.client.users.fetch(data.user).catch(() => null);
        if (!user) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ message: "User not found" }));
        }

		await user.settings.sync(true);
		let amount = this.client.methods.randomNumber(100, 200);

		if (data.isWeekend) amount *= 2;
		if (user && user.send) user.send(`Thank you for upvoting **Senko-san** on <https://discordbots.org>, you've recieved :white_flower: **${amount}** flowers as a bonus! You can do this again after __12 hours__ at <https://Senko-san.moe/upvote>.\n\n**Tip: **\`Voting on Weekends will give you double reward than usual so don't forget to upvote then as well!\``).catch(() => null);
		await user.settings.update([['flowers', user.settings.flowers + amount], ['lastUpvote', Date.now()]]);

		return res.end();
	}

};
