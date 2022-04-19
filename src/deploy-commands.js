const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
// const { clientId, guildId, kairo_token } = require('./config.json');

const commands = [];
const pathToCommands = path.join(__dirname + '/commands/');

const commandFiles = fs.readdirSync(pathToCommands).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`${pathToCommands}${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.kairo_token);

rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);