// Require the necessary discord.js classes
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token, riotAppId } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'rank') {
		const term = interaction.options.getString('sumonner');
		
		const query = new URLSearchParams({ term });
		
		//const dictResult = await request(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${query}?|${riotAppId}`, {method: `GET`});
		
		const { list } = await getJSONResponse(dictResult.body);
		console.log(list)
		
	} else if (commandName === 'info') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	}
});

const { request } = require('undici');

/*
https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/qrAcz-X4OH1hzxE4qfAJOjcIDMCDAmaKtvwXog9Ph5q4pOlV42NPogUbYw
RESPONSE BODY
[
    {
        "leagueId": "0c30f014-d8c4-42f9-8551-500277f04d1e",
        "queueType": "RANKED_TFT",
        "tier": "DIAMOND",
        "rank": "II",
        "summonerId": "qrAcz-X4OH1hzxE4qfAJOjcIDMCDAmaKtvwXog9Ph5q4pOlV42NPogUbYw",
        "summonerName": "rerollornothing",
        "leaguePoints": 0,
        "wins": 149,
        "losses": 119,
        "veteran": false,
        "inactive": false,
        "freshBlood": false,
        "hotStreak": false
    }
]
*/
async function getJSONResponse(body) {
	let fullBody = '';

	for await (const data of body) {
		fullBody += data.toString();
	}

	return JSON.parse(fullBody);
}

// Login to Discord with your client's token
client.login(token);
