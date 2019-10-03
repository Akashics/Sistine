const snek = require('snekfetch');

class anilist {

	static async search(msg, title, cmd) {
		var query = `
		query ($id: Int, $page: Int, $search: String) {
			Page(page: $page) {
				pageInfo {
					total
				}
				media(id: $id, search: $search, type: ${cmd}) {
					id
					title {
						english,
						romaji
					}
					description
					genres
					episodes
					chapters
					coverImage {
						large
					}
					averageScore
					characters(role: MAIN) {
						edges {
							node {
								id
								name {
									first
									last
								}
							}
							role
						}
					}
				}
			}
		}
		
		
		
`;
		const result = await snek.post('https://graphql.anilist.co')
			.set({
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'Raise-Rate-Limit': true
			})
			.send({ query, variables: { search: title } })
			.catch(err => console.log(err));
		if (!result.status === 200) return msg.send(msg.language.get('COMMMAND_ANILIST_APIERROR'));
		return result.body;
	}

	static async buildResponse(msg, data, type) {
		const query = data[0];
		let description = query.description.replace(/<br>/g, '');
		description = description.replace(/\n|\\n/g, ' ');
		description = description.replace(/&mdash;/g, '');
		description = description.replace(/&#039;/g, '');
		description = description.split('.').join('.\n');
		if (description.length > 720) {
			description = description.substring(0, 716);
			description += '...';
		}
		let characterString = query.characters.edges.map(mainC => `[${mainC.node.name.first}${mainC.node.name.last ? ` ${mainC.node.name.last}` : ''}](https://anilist.co/character/${mainC.node.id})`);
		characterString = characterString.join(', ');
		const titleString = query.title.english !== query.title.romaji ? `${query.title.romaji} [${query.title.english}]` : query.title.romaji;
		return {
			title: titleString,
			description,
			url: `https://anilist.co/${type}/${query.id}/`,
			color: 0x00ADFF,
			footer: { text: `⭐ ${type} Rating: ${query.averageScore}/100` },
			thumbnail: { url: query.coverImage.large },
			fields: [
				{
					name: ':movie_camera: Genre',
					value: `${query.genres.join(', ')}`,
					inline: 'true'
				},
				{
					name: `:1234: # of ${query.episodes ? 'Episodes' : 'Chapters'}`,
					value: `${query.episodes ? query.episodes : query.chapters}`,
					inline: 'true'
				},
				{
					name: ':man_dancing: Main Characters',
					value: `**${characterString}**`
				}
			]
		};
	}

}
module.exports = anilist;
