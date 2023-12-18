const { REST, Routes } = require('discord.js');
const { clientId, guildId, kairo_token } = require('./config.json');
const fs = require('fs');
const path = require('path');

const commands = [];
const pathToCommands = path.join(__dirname + '/commands/');

const commandFiles = fs.readdirSync(pathToCommands).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`${pathToCommands}${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST().setToken(kairo_token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);