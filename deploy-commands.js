const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('rank')
	.setDescription('reply with current tft set rank from a sumonner name')
	.addStringOption((option) => option.setName('sumonner').setDescription('The user to boop').setRequired(true)),
	new SlashCommandBuilder().setName('info').setDescription('reply with current tft set info from a sumonner name')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);